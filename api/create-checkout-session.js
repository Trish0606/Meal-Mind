import Stripe from "stripe";

export default async function handler(req, res) {
  // Use the Secret Key stored as an environment variable on Vercel
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID, // Your Price ID from Vercel env
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.origin}/success.html`,
      cancel_url: `${req.headers.origin}/cancel.html`,
    });

    res.status(200).json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
