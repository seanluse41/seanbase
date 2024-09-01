import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
const key = import.meta.env.VITE_TEST_STRIPE_SECRET_KEY
const endpointSecret = import.meta.env.VITE_TEST_STRIPE_WEBHOOK_SECRET;
import { fetchCustomerFromKintone } from '../../../requests/kintoneGetCustomer';
import { updateKintoneRecord } from '../../../requests/kintoneUpdateCustomer';

const stripe = new Stripe(key);

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
      const customerKintoneRecordID = customer.metadata.kintoneRecordID;
      
      if (customerKintoneRecordID) {
        const updatedCustomerFields = {
          companyName: { value: customer.metadata.company_name || '' },
          email: { value: customer.email || '' },
          contactName: { value: customer.name || '' },
          stripeCustomerID: { value: customer.id || '' },
          secretKey: { value: customer.metadata.secretKey || '' },
          domainName: { value: customer.metadata.kintone_domain || '' },
          companyContactNumber: { value: customer.phone || customer.metadata.customer_phone || '' }
        };

        try {
          await updateKintoneRecord(customerKintoneRecordID, updatedCustomerFields);
          console.log('Customer record updated in Kintone');
        } catch (error) {
          console.error('Error updating customer record in Kintone:', error);
        }
      } else {
        console.error('Kintone Record ID not found in customer metadata');
      }
      break;

    case 'customer.subscription.created':
      const subscription = event.data.object;
      const subscriptionKintoneRecordID = subscription.metadata.kintoneRecordID;

      if (subscriptionKintoneRecordID) {
        const updatedSubscriptionFields = {
          stripeSubscriptionID: { value: subscription.id },
          validToDate: { value: new Date(subscription.current_period_end * 1000).toISOString() }
        };

        try {
          await updateKintoneRecord(subscriptionKintoneRecordID, updatedSubscriptionFields);
          console.log('Customer record updated with subscription details');
        } catch (error) {
          console.error('Error updating customer record with subscription details:', error);
        }
      } else {
        console.error('Kintone Record ID not found in subscription metadata');
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