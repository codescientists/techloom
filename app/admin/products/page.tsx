import Pagination from '@/components/admin/shared/Pagination';
import { getAllProducts } from '@/lib/actions/product.action';
import { SearchParamProps } from '@/types';
import { Edit2Icon, PlusCircleIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const Products = async ({searchParams}: SearchParamProps) => {

  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';


  const products = await getAllProducts({
    query: searchText,
    category,
    page,
    limit: 6
  })
  

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Products</h2>
        <Link href={`/admin/products/create`} className="flex items-center bg-slate-900 text-white px-4 py-2 rounded-sm">
          <PlusCircleIcon className='mr-1'/> Create Product
        </Link>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {products?.data.map((product: any)=>(
          <div className="flex flex-col p-4 bg-gray-50 border rounded-md">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={200}
              height={200}
              className="block w-full min-h-[150px] object-cover object-center border"
            /> 
            <div className="mt-2 flex flex-col justify-between h-full">
              <h5 className="text-md font-semibold">{product.name}</h5>
              <p className="text-sm text-slate-600 font-medium">
                Price: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price)}
              </p>
              <p className="text-sm text-slate-600 font-medium">Stock Available: {product.stock}</p>

              <div className="flex items-center justify-center mt-4">
                <Link href={`/admin/products/${product._id}/update`} className="flex items-center border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition px-4 py-1 mr-2 rounded-md">
                  <Edit2Icon className='mr-1 h-4 w-4'/> Edit
                </Link>
                <Link href={`/admin/products/create`} className="flex items-center border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition px-4 py-1 rounded-md">
                  <Trash2Icon className='mr-1 h-4 w-4'/> Delete
                </Link>
              </div>
            </div>
          </div>
        ))}

      </div>

      {products?.totalPages && products.totalPages > 1 && (
          <Pagination page={page} totalPages={products?.totalPages} />
      )}
    </div>
  )
}

export default Products