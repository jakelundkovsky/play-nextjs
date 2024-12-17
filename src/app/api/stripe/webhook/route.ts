import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51OGY59FG2n7yOeuGH9IvzQyDNTwg4IBbHFBi5jhJ8XHR2VpPdQvqUEISAedmbfM5yubMx34DijM9aHAyNkRznKyV00jrHrtStV', {
  apiVersion: '2023-10-16'
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_d9839a0c8416c5785f545560023924fe280982827b69e0f7c6d448c4bcd873d0';

console.log({ stripe, webhookSecret });

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature')!;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const email = paymentIntent.receipt_email;
        // Handle successful payment
        // e.g., update database, send email, etc.
        break;
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false
  }
};
