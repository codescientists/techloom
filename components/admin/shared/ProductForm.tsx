"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { productFormSchema } from '@/lib/validator'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BoxesIcon, IndianRupeeIcon, Link2Icon, MapPinIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Dropdown from "./Dropdown"
import { FileUploader } from "./FileUploader"
import { useUploadThing } from '@/lib/uploadthing'
import { createProduct, updateProduct } from "@/lib/actions/product.action"
import { IProduct } from "@/lib/database/models/product.model"
import { productDefaultValues } from "@/constants"


type ProductFormProps = {
  type: "Create" | "Update"
  product?: IProduct,
  productId?: string
}

const ProductForm = ({type, product, productId}:ProductFormProps) => {

  const [files, setFiles] = useState<File[]>([])
  const initialValues = product && type === 'Update' 
    ? { 
      ...product, category: product?.category._id, 
    } : productDefaultValues

  const router = useRouter();

  const { startUpload } = useUploadThing('imageUploader')

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialValues,
  })
 
  async function onSubmit(values: z.infer<typeof productFormSchema>) {
    let uploadedImageUrl = values.images[0];

    if(files.length > 0) {
      const uploadedImages = await startUpload(files)

      if(!uploadedImages) {
        return
      }

      uploadedImageUrl = uploadedImages[0].url
    }

    if(type === 'Create') {
      try {
        const newEvent = await createProduct({
          name: values.name,
          description: values.description,
          price: values.price,
          stock: values.stock,
          images: [uploadedImageUrl],
          category: values.category,
          path: '/admin/products'
        })

        if(newEvent) {
          form.reset();
          router.push(`/admin/products`)
        }
        
      } catch (error) {
        console.log(error);
      }
    }

    if(type === 'Update') {
      if(!productId) {
        router.back()
        return;
      }

      try {
        const updatedEvent = await updateProduct({
          productId: productId,
          name: values.name,
          description: values.description,
          price: values.price,
          stock: values.stock,
          images: [uploadedImageUrl],
          categoryId: values.category,
          path: `/admin/products`
        })

        if(updatedEvent) {
          form.reset();
          router.push(`/admin/products`)
        }
      } catch (error) {
        (error);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Product Name" {...field} className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <Textarea placeholder="Product Description" {...field} className="textarea rounded-2xl flex items-center w-full overflow-hidden bg-gray-50 px-4 py-4" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <FileUploader 
                      onFieldChange={field.onChange}
                      imageUrl={field.value[0]}
                      setFiles={setFiles}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                      <IndianRupeeIcon />
                      <Input type="number" placeholder="Price" {...field} className="p-regular-16 border-0 bg-gray-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />   
           <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                      <BoxesIcon />

                      <Input type="number" placeholder="Stock Quantity" {...field} className="border-0 bg-gray-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>


        <Button 
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? (
            'Submitting...'
          ): `${type} Product `}</Button>
      </form>
    </Form>
  )
}

export default ProductForm