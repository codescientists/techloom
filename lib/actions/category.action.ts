"use server"

import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Category from "../database/models/category.model"
import { createCategoryParams, updateCategoryParams } from "@/types"
import { revalidatePath } from "next/cache"

export const createCategory = async ({ name, slug, parentCategory }: createCategoryParams) => {
  try {
    await connectToDatabase();

    const newCategory = await Category.create({ name: name, slug: slug, parentCategory : parentCategory && null });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error)
  }
}

export const updateCategory = async ({ categoryId, name, }: updateCategoryParams) => {
  try {
    await connectToDatabase();

    const updatedCategory = await Category.findByIdAndUpdate(categoryId,{ name: name });
    revalidatePath("/admin/categories")
    
    return JSON.parse(JSON.stringify(updatedCategory));
  } catch (error) {
    handleError(error)
  }
}

export const getAllCategories = async () => {
  try {
    await connectToDatabase();

    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error)
  }
}