import { CartItem } from "../interfaces/cart-item";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

const createPaymentIntent = async (items: CartItem[], total: number) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(total * 100),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      items: JSON.stringify(items),
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    items,
    total,
  };
};

export default {
  createPaymentIntent,
};
