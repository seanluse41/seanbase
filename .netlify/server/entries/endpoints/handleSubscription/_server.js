import { j as json } from "../../../chunks/index.js";
import Stripe from "stripe";
const key = "sk_test_51OVocxKcWxTMUXE7Cv8LSwj89A8pYLGxRyyAmW6t2exhyhL0wq0GARzREQsS0HhxLulply7bvcnmv9qS7v8SrR4b00tMIrdi0Y";
const stripe = new Stripe(key);
async function POST({ request }) {
  try {
    const { productId, paymentMethodId, name, email, phone } = await request.json();
    const product = await stripe.products.retrieve(productId);
    if (!product.default_price) {
      throw new Error("No default price found for this product");
    }
    let customer = await stripe.customers.create({
      payment_method: paymentMethodId,
      email,
      name,
      phone,
      invoice_settings: {
        default_payment_method: paymentMethodId
      }
    });
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: product.default_price }],
      expand: ["latest_invoice.payment_intent"],
      metadata: {
        customer_name: name,
        customer_email: email,
        customer_phone: phone
      }
    });
    if (subscription.status === "active") {
      const price = await stripe.prices.retrieve(product.default_price);
      return json({
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        status: subscription.status,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        current_period_end: new Date(subscription.current_period_end * 1e3).toISOString(),
        amount: price.unit_amount,
        currency: price.currency
      });
    } else {
      throw new Error("Subscription failed");
    }
  } catch (error) {
    console.error("Subscription error:", error);
    return json({ error: error.message }, { status: 400 });
  }
}
export {
  POST
};
