"use client"

import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { SheetClose } from '@/components/ui/sheet'
import { removeItemFromCart, updateCartItemQuantity } from '@/lib/actions/user.action'
import { IProduct } from '@/lib/database/models/product.model'
import { ArrowRight, MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CartItems = ({cartItems, userId}: any) => {

    const [cart, setCart] = useState(cartItems);
    const [totalPrice, setTotalPrice] = useState(0);
    
    const pathname = usePathname()

    const handleQuantity = async (productId:string, quantity: number) => {

        const updatedCart = await updateCartItemQuantity({userId, productId, quantity})
        setCart(updatedCart)
    }

    const handleRemoveItem = async (productId: string) => {
        const updatedCart = await removeItemFromCart({userId, productId})

        setCart(updatedCart)
    }

    useEffect(() => {
        const newTotalPrice = cart.reduce((sum:number, cart:any) => sum + (cart.product.price * cart.quantity), 0);
        setTotalPrice(newTotalPrice);
    }, [cart]);
    
    

  return (
    <>
    <ScrollArea className="h-[450px] rounded-md border p-4">
        {cart.map((cartItem: any)=>(
            <div key={cartItem.product._id}>
                <div className="flex items-center border-b border-gray-300 py-4">
                    <div className="flex-shrink-0">
                        <img src={cartItem.product.images[0]} alt={cartItem.product.name} className="w-16 h-16 object-cover" />
                    </div>
                    <div className="flex flex-col ml-4">
                        <p className="text-md font-semibold">{cartItem.product.name}</p>
                        <p className="text-gray-600">
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(cartItem.product.price)}
                        </p>
                        <div className="flex items-center mt-2">
                        <button
                            disabled={cartItem.quantity <= 1}
                            onClick={ ()=> handleQuantity(cartItem.product._id, -1)}
                            className="border h-8 w-8 rounded flex items-center justify-center text-gray-500 focus:outline-none disabled:bg-gray-100"
                        >
                            <MinusIcon className="w-4 h-4"/>
                        </button>
                        <span className="mx-2">{cartItem.quantity}</span>
                        <button
                            disabled={cartItem.quantity >= cartItem.product.stock}
                            onClick={ ()=> handleQuantity(cartItem.product._id, +1)}
                            className="border h-8 w-8 rounded flex items-center justify-center text-gray-500 focus:outline-none disabled:bg-gray-100"
                        >
                            <PlusIcon className="w-4 h-4"/>
                        </button>
                        </div>
                    </div>

                    <div className="ml-auto">
                        <button
                        onClick={() => handleRemoveItem(cartItem.product._id)}
                        className="text-red-500 focus:outline-none"
                        >
                        <Trash2Icon/>
                        </button>
                    </div>
                </div>
                <Separator />
            </div>
        ))}
    </ScrollArea>
    <div className="my-5 w-full">
        <Separator />
        <h5 className="text-lg flex items-center justify-center py-4">
            <span className="font-semibold mr-2">Subtotal :</span>
            <span>
            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalPrice)}
            </span>
        </h5>
        <Separator />
        {!(pathname === '/checkout') && <Link href={`/checkout`} className="w-full h-12 bg-black text-white flex items-center justify-center mt-4">
            <SheetClose className="flex items-center">
                Checkout <ArrowRight className="h-4 w-4 ml-2"/>
            </SheetClose>
        </Link>
        }
    </div>
    </>
  )
}

export default CartItems