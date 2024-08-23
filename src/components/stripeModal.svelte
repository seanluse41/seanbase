<script>
    import { onMount, afterUpdate } from "svelte";
    import { goto } from '$app/navigation';
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
    const stripePublic = import.meta.env.VITE_TEST_STRIPE_PUBLIC_KEY

    export let isOpen = false;
    export let onClose = () => {};
    export let productID;
    export let handleContactSupport;

    let stripe;
    let elements;
    let card;
    let cardError = "";
    let cardMounted = false;
    let cardComplete = false;
    let name = "";
    let email = "";
    let phone = "";
    let emailError = "";
    let form;
    let submitError = "";
    let isSubmitting = false;
    let errorModalOpen = false;

    $: formValid =
        name && email && phone && cardComplete && !cardError && !emailError;

    onMount(async () => {
        stripe = await loadStripe(stripePublic);
    });

    afterUpdate(() => {
        if (isOpen && !cardMounted && stripe) {
            setTimeout(() => {
                elements = stripe.elements();
                card = elements.create("card", {
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#1F2937",
                            "::placeholder": {
                                color: "#6B7280",
                            },
                        },
                    },
                });
                card.mount("#card-element");
                cardMounted = true;

                card.on("change", (event) => {
                    cardError = event.error ? event.error.message : "";
                    cardComplete = event.complete;
                });
            }, 0);
        }
    });

    async function handleSubmit(event) {
        event.preventDefault();
        if (formValid) {
            isSubmitting = true;
            try {
                const { paymentMethod, error } =
                    await stripe.createPaymentMethod({
                        type: "card",
                        card: card,
                        billing_details: { name, email, phone },
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
                    }),
                });

                if (!response.ok)
                    throw new Error("Failed to process subscription");

                const result = await response.json();
                // Redirect to success page with data
                goto("/subscriptionSuccess", {
                    state: {
                        customer_name: result.customer_name,
                        customer_email: result.customer_email,
                        customer_phone: result.customer_phone,
                        current_period_end: result.current_period_end,
                        amount: result.amount,
                        currency: result.currency,
                        product: result.product
                    },
                });
                resetForm();
                onClose();
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
        if (card) {
            card.unmount();
            cardMounted = false;
        }
        name = email = phone = cardError = emailError = submitError = "";
        cardComplete = false;
        if (form) form.reset();
    }

    function validateEmail() {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        emailError =
            email === ""
                ? $_("email.required")
                : !emailRegex.test(email)
                  ? $_("email.invalid")
                  : "";
    }

    function onErrorContactSupport() {
        errorModalOpen = false;
        handleContactSupport();
    }
</script>

<Modal bind:open={isOpen} size="xs" autoclose={false} class="w-full">
    <form
        bind:this={form}
        on:submit={handleSubmit}
        class="flex flex-col space-y-6"
        action="#"
        novalidate
    >
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
            {$_("payment.title")}
        </h3>

        <div>
            <Label for="name" class="mb-2">{$_("payment.name")}</Label>
            <Input
                type="text"
                name="name"
                placeholder={$_("payment.namePlaceholder")}
                required
                bind:value={name}
            />
        </div>

        <div>
            <Label
                for="email"
                color={emailError ? "red" : undefined}
                class="mb-2">{$_("payment.email")}</Label
            >
            <Input
                type="email"
                name="email"
                placeholder={$_("payment.emailPlaceholder")}
                required
                bind:value={email}
                on:input={validateEmail}
                on:blur={validateEmail}
                color={emailError ? "red" : undefined}
            />
            {#if emailError}
                <Helper class="mt-2" color="red">
                    <span class="font-medium">{emailError}</span>
                </Helper>
            {/if}
        </div>

        <div>
            <Label for="phone" class="mb-2">{$_("payment.phone")}</Label>
            <Input
                type="tel"
                name="phone"
                placeholder={$_("payment.phonePlaceholder")}
                required
                bind:value={phone}
            />
        </div>

        <div>
            <Label for="card-element" class="mb-2"
                >{$_("payment.cardInfo")}</Label
            >
            <div
                id="card-element"
                class="p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
            {#if cardError}
                <Helper class="mt-2" color="red">
                    <span class="font-medium">{$_("card.errorPrefix")}</span>
                    {cardError}
                </Helper>
            {/if}
        </div>

        <Button
            type="submit"
            class="w-full"
            disabled={!formValid || isSubmitting}
        >
            {#if isSubmitting}
                {$_("payment.processing")}
            {:else}
                {$_("payment.payNow")}
            {/if}
        </Button>
    </form>
</Modal>

{#if isSubmitting}
    <div
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50"
    >
        <Spinner size={24} />
    </div>
{/if}

<ErrorModal
    bind:open={errorModalOpen}
    errorMessage={submitError}
    onClose={() => (errorModalOpen = false)}
    onContactSupport={onErrorContactSupport}
/>
