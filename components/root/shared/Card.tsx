"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { IProduct } from '@/lib/database/models/product.model'
import RatingComponent from './RatingComponent'
import { HeartIcon, ShoppingCartIcon } from 'lucide-react'
import { addItemToCart } from '@/lib/actions/user.action'
import { useToast } from '@/components/ui/use-toast'
import { usePathname } from 'next/navigation'

type CardProps = {
  product: IProduct;
  userId: string;
}

const Card = ({ product, userId }: CardProps) => {
  const productId = product._id;

  const { toast } = useToast();

  const pathname = usePathname();

  const handleCart = async () => {
    console.log(userId, productId)

    const addedtoCart = await addItemToCart({
      userId: userId,
      productId: productId,
      path: pathname,
    })

    if(addedtoCart) {
      toast({
        title: "Success: Product Added to cart!",
      })
    }
  }

  return (
    <div className="group max-h-[300px] relative flex w-full max-w-[400px] flex-col overflow-hidden bg-white border hover:border-red-600 transition-all">
      {/* Floating buttons  */}
      <div className="absolute top-2 right-2">
        <button 
        onClick={()=>handleCart()}
        
        title='Add to cart' 
        className="rounded-full border flex items-center justify-center h-10 w-10 bg-white hover:bg-red-500 transition hover:text-white mb-2">
          <ShoppingCartIcon className="h-5 w-5"/>
        </button>
        <button title="Add to wishlist" className="rounded-full border flex items-center justify-center h-10 w-10 bg-white hover:bg-red-500 transition hover:text-white">
          <HeartIcon className="h-5 w-5"/>
        </button>
      </div>
      
      <Link 
        href={`/products/${product._id}`}
        style={{backgroundImage: `url(${product.images[0]})`}}
        className="flex flex-grow bg-cover bg-center text-grey-500 h-48"
      />

      <div
        className="flex min-h-fit flex-col gap-1 p-5 md:gap-1"
        > 
        
        <Link href={`/products/${product._id}`}>
          <p className="text-md font-semibold line-clamp-2 flex-1 text-black">{product.name}</p>
        </Link>

        <p className="flex items-center justify-between">
          <span className="text-sm font-bold text-red-600 mr-2">
            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price)}
          </span>
        
          <RatingComponent product={product}/>

        </p>

      </div>
    </div>
  )
}

export default Card