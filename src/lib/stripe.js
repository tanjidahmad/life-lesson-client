import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);

export const PLAN_PRICE_ID = {
  premium: "price_1TkmSeR21VhPcGfR9BLYqOuP",
};