// /src/routes/api/stripeWebhooks/+server.js

import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
const key = import.meta.env.VITE_TEST_STRIPE_SECRET_KEY
const endpointSecret = import.meta.env.VITE_TEST_STRIPE_WEBHOOK_SECRET;
import { updateKintoneRecord } from '../../../requests/kintoneUpdateCustomer';

const stripe = new Stripe(key);

async function formatStripeTimestampForKintone(timestamp) {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  return date.toISOString().split('T')[0]; // Returns "YYYY-MM-DD"
}

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
          number: { value: customer.phone || '' },
          email: { value: customer.email || '' },
          contactName: { value: customer.name || '' },
          stripeCustomerID: { value: customer.id || '' },
          secretKey: { value: customer.metadata.secretKey || '' },
          domainName: { value: customer.metadata.kintone_domain || '' },
          companyContactNumber: { value: customer.phone || customer.metadata.customer_phone || '' }
        };

        try {
          await updateKintoneRecord(customerKintoneRecordID, updatedCustomerFields);
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
        try {
          const formattedDate = await formatStripeTimestampForKintone(subscription.current_period_end);
          const updatedFields = {
            stripeSubscriptionID: { value: subscription.id || '' },
            validToDate: { value: formattedDate }
          };

          await updateKintoneRecord(subscriptionKintoneRecordID, updatedFields);
        } catch (error) {
          console.error('Error updating customer record with subscription details:', error);
          console.error('Subscription object:', JSON.stringify(subscription, null, 2)); // Add this log
        }
      } else {
        console.error('Kintone Record ID not found in subscription metadata');
        console.error('Subscription object:', JSON.stringify(subscription, null, 2)); // Add this log
      }
      break;

    case 'invoice.paid':
      const paidInvoice = event.data.object;
      console.log('Invoice paid:', paidInvoice.id);
      const lineItem = paidInvoice.lines.data[0];
      if (lineItem && lineItem.period && lineItem.period.end) {
        const kintoneRecordID = lineItem.metadata.kintoneRecordID;

        if (kintoneRecordID) {
          try {
            const formattedDate = await formatStripeTimestampForKintone(lineItem.period.end);
            const updatedFields = {
              validToDate: { value: formattedDate }
            };

            await updateKintoneRecord(kintoneRecordID, updatedFields);
            console.log(`Updated Kintone record ${kintoneRecordID} with new validToDate: ${formattedDate}`);
          } catch (error) {
            console.error('Error updating customer record with new validToDate:', error);
            console.error('Invoice line item:', JSON.stringify(lineItem, null, 2));
          }
        } else {
          console.error('Kintone Record ID not found in line item metadata');
          console.error('Invoice line item:', JSON.stringify(lineItem, null, 2));
        }
      } else {
        console.error('Period end not found in invoice line item');
        console.error('Invoice object:', JSON.stringify(paidInvoice, null, 2));
      }
      break;

    case 'invoice.payment_failed':
      const failedInvoice = event.data.object;
      console.log('Invoice payment failed:', failedInvoice.id);
      // TODO: Add logic to handle failed invoice payment
      break;

    case 'customer.subscription.deleted':
      const canceledSubscription = event.data.object;
      const canceledSubscriptionKintoneRecordID = canceledSubscription.metadata.kintoneRecordID;

      if (canceledSubscriptionKintoneRecordID) {
        try {
          const updatedFields = {
            current: { value: 'No' },
            cancellationDate: { value: await formatStripeTimestampForKintone(canceledSubscription.canceled_at) }
          };

          await updateKintoneRecord(canceledSubscriptionKintoneRecordID, updatedFields);
          console.log(`Updated Kintone record ${canceledSubscriptionKintoneRecordID} for canceled subscription`);
        } catch (error) {
          console.error('Error updating customer record with cancellation details:', error);
          console.error('Canceled subscription object:', JSON.stringify(canceledSubscription, null, 2));
        }
      } else {
        console.error('Kintone Record ID not found in canceled subscription metadata');
        console.error('Canceled subscription object:', JSON.stringify(canceledSubscription, null, 2));
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  return json({ received: true });
}