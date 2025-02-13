import Stripe from "stripe";

const stripe = new Stripe("YOUR_STRIPE_SECRET_KEY", {
  apiVersion: "2023-10-16",
});

export default class PaymentRepository {
  async getPaymentIntent(amount: number, currency: string) {
    await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
    });
  }
}
