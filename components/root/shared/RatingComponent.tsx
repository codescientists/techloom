"use client"

import { IProduct } from '@/lib/database/models/product.model'
import { Rating } from 'react-simple-star-rating'

const RatingComponent = ({product}:{product: IProduct}) => {
  return (
    <div className="flex items-center h-10">
        <Rating
            readonly={true}    
            initialValue={5}        
            allowFraction={true}
            size={20}
        />
        <span className="text-gray-500 text-md ml-1">({product.reviews.length})</span>
    </div>
  )
}

export default RatingComponent