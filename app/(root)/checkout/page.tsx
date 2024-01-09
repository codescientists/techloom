import Cart from '@/components/root/shared/Cart'
import Checkout from '@/components/root/shared/Checkout'
import { getCartItems } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs';
import React from 'react'

const Page = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const cart = await getCartItems(userId)

  return (
    <div className="container my-10 flex items-center justify-between w-full">
        <div className="w-1/2 mx-auto"> 
            <Cart />
            <Checkout userId={userId} cart={cart}/>
        </div>
    </div>
  )
}

export default Page
