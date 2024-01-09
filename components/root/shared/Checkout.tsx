"use client"

import { checkoutOrder } from '@/lib/actions/order.action';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({userId, cart}: any) => {
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
    
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

    const onCheckout = async () => {
        const order = {
          cart: cart,
          buyerId: userId
        }

        await checkoutOrder(order);
    }

  return (
    <form action={onCheckout} method="post">
        <button type='submit' className="w-full h-12 bg-black text-white flex items-center justify-center mt-4">
            Proceed to pay
        </button>
    </form>
  )
}

export default Checkout