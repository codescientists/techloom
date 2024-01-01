"use client"

import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Card from "./Card"
import { IProduct } from "@/lib/database/models/product.model"

type BestSellingProductsParams = {
    data: IProduct[]
}
const BestSellingProducts = ({data}: BestSellingProductsParams) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {data.map((product) => (
          <CarouselItem key={product._id} className="md:basis-1/2 lg:basis-1/5">
            <div className="p-1">
              <Card product={product} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default BestSellingProducts;