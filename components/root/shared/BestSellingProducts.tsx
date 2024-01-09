"use client"


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Card from "./Card"
import { IProduct } from "@/lib/database/models/product.model"
import { useEffect, useState } from "react"
import { getAllProducts } from "@/lib/actions/product.action"

type BestSellingProductsParams = {
    data: IProduct[],
    userId: string,
}

const BestSellingProducts = ({data, userId}: BestSellingProductsParams) => {


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
              <Card product={product} userId={userId} />
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