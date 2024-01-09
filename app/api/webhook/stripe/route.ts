import stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.action'

export async function POST(request: Request) {
  const body = await request.text()

  const sig = request.headers.get('stripe-signature') as string
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    return NextResponse.json({ message: 'Webhook error', error: err })
  }

  // Get the ID and type
  const eventType = event.type

  // CREATE
  if (eventType === 'checkout.session.completed') {
    const { amount_total, metadata, line_items, shipping_details } = event.data.object;
    
    const order = {
      buyerId: metadata?.buyerId || '',
      products: line_items,
      totalAmount: amount_total || 0,
      shippingAddress: shipping_details || null,
      createdAt: new Date(),
    }

    console.log(order)

    const newOrder = await createOrder(order)

    return NextResponse.json({ message: 'OK', newOrder })
  }

  return new Response('', { status: 200 })
}