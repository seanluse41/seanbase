import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
const key = import.meta.env.VITE_TEST_STRIPE_SECRET_KEY

const stripe = new Stripe(key);

async function sendEmail(fetch, to, subject, text) {
  const response = await fetch('/sendSubscriptionEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to,
      subject,
      text,
      attachmentData: '', // No attachment for now
      attachmentName: '' // No attachment for now
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send email');
  }

  return response.json();
}

export async function POST({ request, fetch }) {
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
            const price = await stripe.prices.retrieve(product.default_price);

            // Send confirmation email
            try {
                await sendEmail(
                    fetch,
                    email,
                    'Subscription Confirmation',
                    'Thank you for your subscription!'
                );
            } catch (emailError) {
                console.error('Failed to send confirmation email:', emailError);
                // Don't throw here, as we still want to return the subscription info
            }

            return json({
                subscriptionId: subscription.id,
                clientSecret: subscription.latest_invoice.payment_intent.client_secret,
                status: subscription.status,
                customer_name: name,
                customer_email: email,
                customer_phone: phone,
                current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                amount: price.unit_amount,
                currency: price.currency,
                product: product.name
            });
        } else {
            throw new Error('Subscription failed');
        }

    } catch (error) {
        console.error('Subscription error:', error);
        return json({ error: error.message }, { status: 400 });
    }
}