import stripe from 'stripe'
import { NextResponse } from 'next/server'
import { updateOrder } from '@/lib/actions/order.action'

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
    const { metadata, shipping_details,  } = event.data.object;
    
    const order = {
      orderId: metadata?.orderId || '',
      shippingAddress: shipping_details,
    }

    const updatedOrder = await updateOrder(order)

    return NextResponse.json({ message: 'OK', updatedOrder })
  }

  return new Response('', { status: 200 })
}