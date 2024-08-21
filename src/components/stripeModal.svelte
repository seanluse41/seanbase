<script>
    import { onMount, afterUpdate } from 'svelte';
    import { loadStripe } from '@stripe/stripe-js';
    import { Modal, Button, Input, Label, Helper } from 'flowbite-svelte';
    import { _ } from 'svelte-i18n';

    export let isOpen = false;
    export let onClose = () => {};
    export let productID;

    let stripe;
    let elements;
    let card;
    let cardError = '';
    let cardMounted = false;
    let cardComplete = false;
    let name = '';
    let email = '';
    let phone = '';
    let formValid = false;
    let emailError = '';
    let form;
    let submitError = '';

    $: formValid = name && email && phone && cardComplete && !cardError && !emailError;

    onMount(async () => {
        stripe = await loadStripe('pk_test_51OVocxKcWxTMUXE7upe9vTk3cseppJNw5YJ2OmMlQHqzbBFwxsi4ylxqUQqdmozIF3TMB2N8aT5dlkuNxzYLMThd00o6b2mKwX');
    });

    afterUpdate(() => {
        if (isOpen && !cardMounted && stripe) {
            setTimeout(() => {
                elements = stripe.elements();
                card = elements.create('card', {
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#1F2937',
                            '::placeholder': {
                                color: '#6B7280',
                            },
                        },
                    },
                });
                card.mount('#card-element');
                cardMounted = true;

                card.on('change', (event) => {
                    cardError = event.error ? event.error.message : '';
                    cardComplete = event.complete;
                });
            }, 0);
        }
    });

    async function handleSubmit(event) {
        event.preventDefault();
        if (formValid) {
            try {
                const { paymentMethod, error } = await stripe.createPaymentMethod({
                    type: 'card',
                    card: card,
                    billing_details: {
                        name: name,
                        email: email,
                        phone: phone,
                    },
                });

                if (error) {
                    throw new Error(error.message);
                }

                const response = await fetch('/handleSubscription', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        productId: productID,
                        paymentMethodId: paymentMethod.id,
                        name,
                        email,
                        phone,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to process subscription');
                }

                const result = await response.json();
                console.log('Subscription processed:', result);

                resetForm();
                onClose();
            } catch (error) {
                console.error('Error processing subscription:', error);
                submitError = error.message;
            }
        }
    }

    function handleClose() {
        resetForm();
        onClose();
    }

    function resetForm() {
        if (card) {
            card.unmount();
            cardMounted = false;
        }
        name = '';
        email = '';
        phone = '';
        cardError = '';
        emailError = '';
        submitError = '';
        cardComplete = false;
        if (form) form.reset();
    }

    function validateEmail() {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email === '') {
            emailError = $_('email.required');
        } else if (!emailRegex.test(email)) {
            emailError = $_('email.invalid');
        } else {
            emailError = '';
        }
    }
</script>

<Modal bind:open={isOpen} size="xs" autoclose={false} class="w-full" on:close={handleClose}>
    <form bind:this={form} on:submit={handleSubmit} class="flex flex-col space-y-6" action="#" novalidate>
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">{$_('payment.title')}</h3>
        
        <div>
            <Label for="name" class="mb-2">{$_('payment.name')}</Label>
            <Input type="text" name="name" placeholder={$_('payment.namePlaceholder')} required bind:value={name} />
        </div>

        <div>
            <Label for="email" color={emailError ? "red" : undefined} class="mb-2">{$_('payment.email')}</Label>
            <Input 
                type="email" 
                name="email" 
                placeholder={$_('payment.emailPlaceholder')} 
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
            <Label for="phone" class="mb-2">{$_('payment.phone')}</Label>
            <Input type="tel" name="phone" placeholder={$_('payment.phonePlaceholder')} required bind:value={phone} />
        </div>
        
        <div>
            <Label for="card-element" class="mb-2">{$_('payment.cardInfo')}</Label>
            <div id="card-element" class="p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" />
            {#if cardError}
                <Helper class="mt-2" color="red">
                    <span class="font-medium">{$_('card.errorPrefix')}</span> {cardError}
                </Helper>
            {/if}
        </div>
        
        <Button type="submit" class="w-full" disabled={!formValid}>{$_('payment.payNow')}</Button>
    </form>
</Modal>