// src/routes/api/stripeWebhooks/+server.js
import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
const key = import.meta.env.VITE_TEST_STRIPE_SECRET_KEY
import { fetchCustomerFromKintone } from '../../../requests/kintoneGetCustomer';
import { addCustomerToKintone } from '../../../requests/kintoneCreateCustomer';
import { updateKintoneRecord } from '../../../requests/kintoneUpdateCustomer';

const stripe = new Stripe(key);

const endpointSecret = "whsec_hkVpvrBmUhu98cVy4xOMsAvhbwvMDup9";

export async function POST({ request }) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'customer.created':
      const customer = event.data.object;
      await addCustomerToKintone(customer);
      break;

    case 'customer.subscription.created':
      const subscription = event.data.object;
      try {
        // Fetch the customer record from Kintone
        const customer = await fetchCustomerFromKintone(subscription.customer);
        console.log(customer)
        // Update the customer record with subscription details
        const updatedRecord = {
          stripeSubscriptionID: { value: subscription.id },
          validToDate: { value: new Date(subscription.current_period_end * 1000).toISOString() }
        };
        await updateKintoneRecord(customer.id, updatedRecord);

        console.log('Customer record updated with subscription details');
      } catch (error) {
        console.error('Error handling subscription creation:', error);
        // You might want to add some error handling logic here
      }
      break;

    case 'invoice.paid':
      const paidInvoice = event.data.object;
      console.log('Invoice paid:', paidInvoice.id);
      // TODO: Add logic to handle paid invoice
      break;

    case 'invoice.payment_failed':
      const failedInvoice = event.data.object;
      console.log('Invoice payment failed:', failedInvoice.id);
      // TODO: Add logic to handle failed invoice payment
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  return json({ received: true });
}