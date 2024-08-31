<script>
    import { onMount, afterUpdate } from "svelte";
    import { goto } from "$app/navigation";
    import { loadStripe } from "@stripe/stripe-js";
    import {
        Modal,
        Button,
        Input,
        Label,
        Helper,
        Spinner,
    } from "flowbite-svelte";
    import { _ } from "svelte-i18n";
    import ErrorModal from "./errorModal.svelte";

    const stripePublic = import.meta.env.VITE_TEST_STRIPE_PUBLIC_KEY;

    export let isOpen = false;
    export let onClose = () => {};
    export let productID;
    export let handleContactSupport;

    let stripe;
    let elements;
    let paymentElement;
    let name = "";
    let email = "";
    let phone = "";
    let companyName = "";
    let kintoneDomain = "";
    let emailError = "";
    let kintoneDomainError = "";
    let form;
    let submitError = "";
    let isSubmitting = false;
    let errorModalOpen = false;
    let currentStep = 1;

    $: formStep1Valid = name && email && kintoneDomain && !emailError && !kintoneDomainError;

    onMount(async () => {
        stripe = await loadStripe(stripePublic);
    });

    afterUpdate(async () => {
        if (isOpen && !elements && stripe && currentStep === 2) {
            const options = {
                mode: 'setup',
                payment_method_types: ['card'],
                paymentMethodCreation: 'manual'
            };
            elements = stripe.elements(options);
            const paymentElementOptions = {
                layout: "tabs",
            };
            paymentElement = elements.create("payment", paymentElementOptions);
            paymentElement.mount("#payment-element");
        }
    });

    function validateEmail() {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        emailError = email === "" ? $_("email.required") : !emailRegex.test(email) ? $_("email.invalid") : "";
    }

    function validateKintoneDomain() {
        const domainRegex = /^(https:\/\/)?(www\.)?[\w-]+\.(kintone|cybozu)\.com\/?$/i;
        kintoneDomainError = kintoneDomain === "" ? $_("kintoneDomain.required") : !domainRegex.test(kintoneDomain) ? $_("kintoneDomain.invalid") : "";
    }

    function nextStep() {
        if (formStep1Valid) {
            currentStep = 2;
        }
    }

    function prevStep() {
        currentStep = 1;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (elements) {
            isSubmitting = true;
            try {
                // Submit the form first
                const { error: submitError } = await elements.submit();
                if (submitError) {
                    throw new Error(submitError.message);
                }

                // Then create the payment method
                const { error, paymentMethod } = await stripe.createPaymentMethod({
                    elements,
                    params: {
                        billing_details: { name, email, phone },
                    },
                });

                if (error) throw new Error(error.message);

                const response = await fetch("/api/handleSubscription", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        productId: productID,
                        paymentMethodId: paymentMethod.id,
                        name,
                        email,
                        phone,
                        companyName,
                        kintoneDomain,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to process subscription");
                }

                const result = await response.json();

                if (result.status === 'active') {
                    goto("/subscriptionSuccess", { state: result });
                    resetForm();
                    onClose();
                } else {
                    throw new Error("Subscription not active");
                }
            } catch (error) {
                console.error("Error processing subscription:", error);
                submitError = error.message;
                errorModalOpen = true;
            } finally {
                isSubmitting = false;
            }
        }
    }

    function resetForm() {
        if (paymentElement) {
            paymentElement.unmount();
            elements = null;
        }
        name = email = phone = companyName = kintoneDomain = emailError = kintoneDomainError = submitError = "";
        currentStep = 1;
        if (form) form.reset();
    }

    function onErrorContactSupport() {
        errorModalOpen = false;
        handleContactSupport();
    }
</script>

<Modal bind:open={isOpen} size="xs" autoclose={false} class="w-full">
    <form bind:this={form} on:submit={handleSubmit} class="flex flex-col space-y-6" action="#" novalidate>
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
            {$_("payment.title")}
        </h3>

        {#if currentStep === 1}
            <!-- Step 1: Customer Information -->
            <div>
                <Label for="name" class="mb-2">{$_("payment.name")}</Label>
                <Input type="text" name="name" placeholder={$_("payment.namePlaceholder")} required bind:value={name} />
            </div>

            <div>
                <Label for="companyName" class="mb-2">{$_("payment.companyName")}</Label>
                <Input type="text" name="companyName" placeholder={$_("payment.companyNamePlaceholder")} bind:value={companyName} />
            </div>

            <div>
                <Label for="email" color={emailError ? "red" : undefined} class="mb-2">{$_("payment.email")}</Label>
                <Input type="email" name="email" placeholder={$_("payment.emailPlaceholder")} required bind:value={email} on:input={validateEmail} on:blur={validateEmail} color={emailError ? "red" : undefined} />
                {#if emailError}
                    <Helper class="mt-2" color="red">
                        <span class="font-medium">{emailError}</span>
                    </Helper>
                {/if}
            </div>

            <div>
                <Label for="phone" class="mb-2">{$_("payment.phone")}</Label>
                <Input type="tel" name="phone" placeholder={$_("payment.phonePlaceholder")} bind:value={phone} />
            </div>

            <div>
                <Label for="kintoneDomain" color={kintoneDomainError ? "red" : undefined} class="mb-2">{$_("payment.kintoneDomain")}</Label>
                <Input type="url" name="kintoneDomain" placeholder="seanco.cybozu.com" required bind:value={kintoneDomain} on:input={validateKintoneDomain} on:blur={validateKintoneDomain} color={kintoneDomainError ? "red" : undefined} />
                {#if kintoneDomainError}
                    <Helper class="mt-2" color="red">
                        <span class="font-medium">{kintoneDomainError}</span>
                    </Helper>
                {/if}
            </div>

            <Button type="button" class="w-full" on:click={nextStep} disabled={!formStep1Valid}>
                {$_("payment.next")}
            </Button>
        {:else}
            <!-- Step 2: Payment Information -->
            <div id="payment-element">
                <!-- Stripe Elements will be inserted here -->
            </div>

            <div class="flex justify-between">
                <Button type="button" class="w-1/2 m-2" on:click={prevStep}>
                    {$_("payment.back")}
                </Button>
                <Button type="submit" class="w-1/2 m-2" disabled={isSubmitting}>
                    {#if isSubmitting}
                        {$_("payment.processing")}
                    {:else}
                        {$_("payment.payNow")}
                    {/if}
                </Button>
            </div>
        {/if}
    </form>
</Modal>

{#if isSubmitting}
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
        <Spinner size={24} />
    </div>
{/if}

<ErrorModal
    bind:open={errorModalOpen}
    errorMessage={submitError}
    onClose={() => (errorModalOpen = false)}
    onContactSupport={onErrorContactSupport}
/>