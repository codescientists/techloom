"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { IProduct } from '@/lib/database/models/product.model'
import { Rating } from 'react-simple-star-rating'
import RatingComponent from './RatingComponent'


type CardProps = {
  product: IProduct
}

const Card = ({ product }: CardProps) => {

  return (
    <div className="group max-h-[300px] relative flex w-full max-w-[400px] flex-col overflow-hidden bg-white border hover:border-red-600 transition-all">
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