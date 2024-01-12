'use server'

import { UpdateProductParams, createProductParams, getAllProductsParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Product from "../database/models/product.model";
import { revalidatePath } from "next/cache";
import Category from "../database/models/category.model";
import Review from "../database/models/review.model";
import User from "../database/models/user.model";

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } })
}

const populateCategory = (query: any) => {
  return query
  .populate({ path: 'category', model: Category, select: '_id name' })
  .populate({
    path: 'reviews',
    model: Review,
    select: '_id rating text',
    populate: { path: 'user', model: User, select: '_id name photo' }
  });
}


export const createProduct = async ({ name, description, price, stock, images, category, path }: createProductParams) => {
    try {
      await connectToDatabase();
  
      const newProduct = await Product.create({ 
        name: name, 
        description: description, 
        price: price, 
        stock: stock,
        images: images,
        category: category
     });

     revalidatePath(path)
  
      return JSON.parse(JSON.stringify(newProduct));

    } catch (error) {
      handleError(error)
    }
}

export async function updateProduct({ productId, name, description, price, stock, images, categoryId, path }: UpdateProductParams) {
  try {
    await connectToDatabase()

    const productToUpdate = await Product.findById(productId)
    if (!productToUpdate) {
      throw new Error('Product not found')
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          name: name,
          description: description,
          price: price,
          stock: stock,
          category: categoryId,
          "images.0": images[0] 
        }
      },
      { new: true }
    );
    
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedProduct))
  } catch (error) {
    handleError(error)
  }
}


export async function getAllProducts({ query, limit = 6, page, category }: getAllProductsParams) {
  try {
    await connectToDatabase()

    const titleCondition = query ? { name: { $regex: query, $options: 'i' } } : {}
    const categoryCondition = category ? await getCategoryByName(category) : null
    const conditions = {
      $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
    }

    const skipAmount = (Number(page) - 1) * limit;

    const productsQuery = Product.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const products = await populateCategory(productsQuery)
    const productsCount = await Product.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(products)),
      totalPages: Math.ceil(productsCount / limit),
    }
    
  } catch (error) {
    handleError(error)
  }
}


export async function getProductById(productId: string) {
  try {
    await connectToDatabase()

    const product = await populateCategory(Product.findById(productId))

    if (!product) throw new Error('Product not found')

    return JSON.parse(JSON.stringify(product))
  } catch (error) {
    handleError(error)
  }
}

