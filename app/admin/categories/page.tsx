"use client"

import { Edit2Icon, PlusCircleIcon } from 'lucide-react'
import Link from 'next/link'
import React, { startTransition, useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from '@/components/ui/button'
import { createCategory, getAllCategories, updateCategory } from '@/lib/actions/category.action'
import { ICategory } from '@/lib/database/models/category.model'
import { Input } from '@/components/ui/input'

type categoryParams = {
      _id: string,
      name: string,
      slug:string,
}


const Categories = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [newCategory, setNewCategory] = useState('');
  const [updatedCategory, setUpdatedCategory] = useState('')
  
  // Generating slug 
  function slugify(str: string) {
      return str.toLowerCase()
        .replace(/[^a-z0-9-]+/g, '-') // Remove non-alphanumeric characters
        .replace(/-+/g, '-')         // Replace multiple hyphens with single
        .trim();                  // Trim leading/trailing hyphens
      }
    

  const handleAddCategory = () => {
    createCategory({
      name: newCategory,
      slug: slugify(newCategory),
    })
      .then((category:any) => {
        setCategories((prevState) => [...prevState, category])
      })
  }

  const handleEditCategory = (categoryId:any) => {
    updateCategory({
      categoryId: categoryId,
      name: updatedCategory,
    }) 
  }

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[])
    }

    getCategories();
  }, [])


  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Categories</h2>


        <AlertDialog>
          <AlertDialogTrigger>
            <div className="flex items-center bg-slate-900 text-white px-4 py-2 rounded-sm">
              <PlusCircleIcon className='mr-1'/> Add Category
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input type="text" placeholder="Category name" className="input-field mt-3" onChange={(e) => setNewCategory(e.target.value)} />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
      </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category:categoryParams) => (
          <TableRow key={category._id}>
            <TableCell className="font-medium">{category.name}</TableCell>
            <TableCell>{category.slug}</TableCell>
            <TableCell >
              <AlertDialog>
                <AlertDialogTrigger>
                  <div onClick={()=>setUpdatedCategory(category.name)} className="text-xs flex items-center border px-2 py-1 rounded-sm">
                    <Edit2Icon className="h-2 w-2 mr-1"/> Edit
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Edit Category</AlertDialogTitle>
                    <AlertDialogDescription>
                      <Input type="text" className="bg-gray-100 mt-3" value={updatedCategory} onChange={(e)=>{setUpdatedCategory(e.target.value)}} />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleEditCategory(category._id)}>Save</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}

export default Categories