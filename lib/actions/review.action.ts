'use server'

import { createReviewParams } from "@/types";
import { connectToDatabase } from "../database";
import Review from "../database/models/review.model";
import { revalidatePath } from "next/cache";
import { handleError } from "../utils";
import Product from "../database/models/product.model";
import User from "../database/models/user.model";

export const createReview = async ({ userId, productId, rating, comment, path }: createReviewParams) => {
    try {
      await connectToDatabase();

      const newReview = await Review.create({ 
          user: userId,
          product: productId,
          rating: rating,
          text: comment,
      });

     revalidatePath(path)

     await Product.findByIdAndUpdate(
        productId,
        { $push: { reviews: newReview._id } },
        { new: true }
      );

  
      return JSON.parse(JSON.stringify(newReview));

    } catch (error) {
      handleError(error)
    }
}

