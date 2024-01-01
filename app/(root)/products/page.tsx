import Collection from '@/components/root/shared/Collection';
import { getAllProducts } from '@/lib/actions/product.action';
import { SearchParamProps } from '@/types';
import React from 'react'

const Products = async ({searchParams}: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';


  const products = await getAllProducts({
    query: searchText,
    category,
    page,
    limit: 8
  })

  return (
    <div className="container">
        <div className="my-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold">Our Products</h2>
        </div>
        <Collection
          data={products?.data}
          emptyTitle="No Products Found"
          emptyStateSubtext="Come back later"
          limit={8}
          page={page}
          totalPages={products?.totalPages}
        />
      </div>
    </div>
  )
}

export default Products