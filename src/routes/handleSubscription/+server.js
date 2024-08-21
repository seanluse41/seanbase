// src/routes/handleSubscription/+server.js
import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
const key = import.meta.env.VITE_TEST_STRIPE_SECRET_KEY

const stripe = new Stripe(key);

export async function POST({ request }) {
    try {
        const { productId, paymentMethodId, name, email, phone } = await request.json();

        // Fetch the product to get its default price
        const product = await stripe.products.retrieve(productId);
        if (!product.default_price) {
            throw new Error('No default price found for this product');
        }

        // Create or retrieve a customer
        let customer = await stripe.customers.create({
            payment_method: paymentMethodId,
            email: email,
            name: name,
            phone: phone,
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        });
        // Create the subscription using the default price
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: product.default_price }],
            expand: ['latest_invoice.payment_intent'],
            metadata: {
                customer_name: name,
                customer_email: email,
                customer_phone: phone
            }
        });
        if (subscription.status === 'active') {
            return json({
                subscriptionId: subscription.id,
                clientSecret: subscription.latest_invoice.payment_intent.client_secret,
                status: subscription.status
            });
        } else {
            throw new Error('Subscription failed');
        }

    } catch (error) {
        console.error('Subscription error:', error);
        return json({ error: error.message }, { status: 400 });
    }
}