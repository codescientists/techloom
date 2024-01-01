
import RatingComponent from '@/components/root/shared/RatingComponent';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getProductById } from '@/lib/actions/product.action'
import { SearchParamProps } from '@/types'
import { RefreshCcw, ShoppingCartIcon, TruckIcon } from 'lucide-react';
import Link from 'next/link';

const ProductDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
    const product = await getProductById(id);

  return (
    <div className="container flex my-10 min-h-[500px]">
        <div className="w-full md:w-1/2 ">
            <img src={product.images[0]} alt="" className="h-full w-full object-cover border" />
        </div>
        <div className="w-full md:w-5/12 px-10">
            <h2 className="text-2xl font-bold">{product.name}</h2>

            <RatingComponent product={product}/>

            <p className="text-2xl my-2 font-semibold">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price)}
            </p>

            <p className="text-sm">{product.description}</p>

            <Separator className="my-4"/>

            <div className="flex items-center">
              <Link href={`/checkout`} className="px-6 py-2 bg-red-500 text-white mr-2">Buy Now</Link>
              <button className="h-10 w-10 flex items-center justify-center border-2 rounded">
                <ShoppingCartIcon />
              </button>
            </div>

            <div className="mt-10 w-full">
              <div className="flex items-center border-2 border-black">
                <div className="p-4">
                  <TruckIcon className="h-10 w-10"/>
                </div>
                <div className="font-regular">
                  <h6 className="text-lg">Free Delivery</h6>
                  <p className='underline text-sm'>Enter your pincode for delivery availablity</p>
                </div>
              </div>
              <div className="flex items-center border-2 border-black border-t-0">
                <div className="p-4">
                  <RefreshCcw className="h-10 w-10"/>
                </div>
                <div className="font-regular">
                  <h6 className="text-lg">Return Delivery</h6>
                  <p className='underline text-sm'>Free 30 Days Return Policy</p>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails