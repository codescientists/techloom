import ProductForm from '@/components/admin/shared/ProductForm'
import React from 'react'

const CreateProduct = () => {
  return (
    <>
    <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-2">
        <h3 className="wrapper font-semibold text-center sm:text-left">Create Product</h3>
    </section>

    <div className="wrapper my-4">
        <ProductForm type="Create" />
    </div>
    </>
  )
}

export default CreateProduct