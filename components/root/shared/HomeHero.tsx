"use client"
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { ICategory } from '@/lib/database/models/category.model'
import { getAllCategories } from '@/lib/actions/category.action'


const HomeHero = () => {

  const [categories, setCategories] = useState<ICategory[]>([])

  useEffect(() => {
    const getCategories = async () => {
        const categoryList = await getAllCategories();

        categoryList && setCategories(categoryList as ICategory[])
    }

    getCategories();
    }, [])
    
  return (
    <div className="w-full min-h-64 mt-4 flex">
        <div className="w-1/5 hidden md:flex">
            <ul className="space-y-2">
                {categories.slice(0,10).map((cateogory:ICategory)=>(
                    <li key={cateogory._id} className="font-semibold hover:bg-slate-100 px-4 py-1 mx-2 rounded">
                        <Link href={`/`}>{cateogory.name}</Link>
                    </li>
                ))}
            </ul>
        </div>

        <Separator orientation='vertical' className="hidden md:block"/>

        <div className="w-full md:w-4/6 md:px-4 mx-auto my-auto">
        <Carousel
        plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
        >
            <CarouselContent>
                <CarouselItem>
                    <div className="h-40 md:h-64">
                        <img src="/assets/banner-1.png" alt="" className="w-full h-full object-cover"/>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div className="h-40 md:h-64">
                        <img src="/assets/banner-1.png" alt="" className="w-full h-full object-cover"/>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div className="h-40 md:h-64">
                        <img src="/assets/banner-1.png" alt="" className="w-full h-full object-cover"/>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div className="h-40 md:h-64">
                        <img src="/assets/banner-1.png" alt="" className="w-full h-full object-cover"/>
                    </div>
                </CarouselItem>
            </CarouselContent>     
        </Carousel>

            
        </div>
    </div>
  )
}

export default HomeHero