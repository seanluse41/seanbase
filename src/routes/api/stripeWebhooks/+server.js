// src/routes/api/stripeWebhooks/+server.js
import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
const key = import.meta.env.VITE_TEST_STRIPE_SECRET_KEY
import * as crypto from 'crypto';

const stripe = new Stripe(key);

const endpointSecret = "whsec_hkVpvrBmUhu98cVy4xOMsAvhbwvMDup9";
const customerAppID = import.meta.env.VITE_CUSTOMER_INFO_APPID
const subdomain = import.meta.env.VITE_SUBDOMAIN
const customerAppToken = import.meta.env.VITE_CUSTOMER_INFO_TOKEN

function generateSecretKey() {
  return crypto.randomBytes(8).toString('hex');
}

async function addCustomerToKintone(customer) {

  const secretKey = generateSecretKey();

    const record = {
      companyName: { value: customer.metadata.company_name || '' },
      email: { value: customer.email || '' },
      current: { value: 'Yes' }, // Assuming a new customer is current
      contactName: { value: customer.name || '' }, // Using name as contact name if available
      stripeCustomerID: { value: customer.id },
      // Fields below are left empty or with placeholder values as they're not typically available in customer.created event
      secretKey: { value: secretKey },
      domainName: { value: customer.metadata.kintone_domain || '' },
      stripeSubscriptionID: { value: '' },
      validToDate: { value: '' },
      cancellationDate: { value: '' },
      cancellationPageLink: { value: '' }
    };
  
    // Add company contact number if available in metadata or phone field
    if (customer.phone) {
      record.companyContactNumber = { value: customer.phone };
    } else if (customer.metadata && customer.metadata.customer_phone) {
      record.companyContactNumber = { value: customer.metadata.customer_phone };
    }
    
  const url = `https://${subdomain}.kintone.com/k/v1/record.json`;
  const headers = {
    'X-Cybozu-API-Token': customerAppToken,
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ app: customerAppID, record: record })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Customer added to Kintone:', data);
    return data;
  } catch (error) {
    console.error('Error adding customer to Kintone:', error);
    throw error;
  }
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
      console.log('New customer created:', customer.id);
      await addCustomerToKintone(customer);
      break;
    
    case 'customer.subscription.created':
      const subscription = event.data.object;
      console.log('New subscription created:', subscription.id);
      // TODO: Add logic to handle new subscription
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