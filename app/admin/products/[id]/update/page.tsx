import ProductForm from '@/components/admin/shared/ProductForm'
import { getProductById } from '@/lib/actions/product.action';
import { auth } from '@clerk/nextjs';
import React from 'react'

type updateProductParams = {
  params:{
    id: string
  }
}

const UpdateProduct = async ({params: {id}}: updateProductParams) => {
  const product = await getProductById(id)
  
  return (
    <>
    <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-2">
        <h3 className="wrapper font-semibold text-center sm:text-left">Update Product</h3>
    </section>

    <div className="wrapper my-4">
        <ProductForm  type="Update" product={product} productId={id} />
    </div>
    </>
  )
}

export default UpdateProduct