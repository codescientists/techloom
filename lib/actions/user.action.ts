'use server'

import { CreateUserParams, UpdateUserParams } from "@/types"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import { handleError } from "../utils"
import { revalidatePath } from "next/cache"
import Order from "../database/models/order.model"
import Product from "../database/models/product.model"

export async function createUser(user: CreateUserParams) {
    try {
      await connectToDatabase()
  
      const newUser = await User.create(user)
      return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
      handleError(error)
    }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
    try {
      await connectToDatabase()
  
      const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true })
      
      if (!updatedUser) throw new Error('User update failed')

      return JSON.parse(JSON.stringify(updatedUser))

    } catch (error) {
      handleError(error)
    }
}
  
export async function deleteUser(clerkId: string) {
    try {
      await connectToDatabase()
      
      // Find user to delete
      const userToDelete = await User.findOne({ clerkId })
  
      if (!userToDelete) {
        throw new Error('User not found')
      }
  
      // Unlink relationships
      await Promise.all([

        // Update the 'orders' collection to remove references to the user
        Order.updateMany({ _id: { $in: userToDelete.orders } }, { $unset: { buyer: 1 } }),
      ])
      
      // Delete user
      const deletedUser = await User.findByIdAndDelete(userToDelete._id)
      
      revalidatePath('/')
      
      return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
    } catch (error) {
      handleError(error)
    }
}


export async function getUser(userId:string | undefined) {
      try {
        await connectToDatabase()
    
        const user = await User.find({ clerkId: userId }).populate('cart');
        
        return JSON.parse(JSON.stringify(user[0]))
      } catch (error) {
        handleError(error)
      }
}

export async function getAllAdmins() {
      try {
        await connectToDatabase()
    
        const admins = await User.find({ admin: true });
        
        return JSON.parse(JSON.stringify(admins))
      } catch (error) {
        handleError(error)
      }
}



// CART Actions 
type addItemToCartParams = {
  userId: string;
  productId: string;
  path: string;
}

export async function addItemToCart({userId, productId, path}: addItemToCartParams) {
  try {
    await connectToDatabase()

    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const existingCartItem = user.cart.find((cartItem:any) => 
      cartItem.product && cartItem.product.equals(productId)
    );
    
    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      user.cart.push({ product:productId, quantity: 1 });
    }

    await user.save();

    revalidatePath(path)

    return JSON.parse(JSON.stringify(user.cart))
  } catch (error) {
    handleError(error)
  }
}

type removeItemFromCartParams ={
  userId: string;
  productId: string;
}

export async function removeItemFromCart({userId, productId}: removeItemFromCartParams) {
  try {
    await connectToDatabase()

    const user = await User.findById(userId).populate('cart.product');

    if (!user) {
      throw new Error('User not found');
    }

    user.cart = user.cart.filter((cartItem:any) => !cartItem.product.equals(productId)); 

    await user.save();

    return JSON.parse(JSON.stringify(user.cart))
  } catch (error) {
    handleError(error)
  }
}

export async function getCartItems(userId: string) {
  try {
    await connectToDatabase()

    const user = await User.findById(userId).populate('cart.product');
    
    if (!user) {
      throw new Error('User not found');
    }

    return JSON.parse(JSON.stringify(user.cart))
  } catch (error) {
    handleError(error)
  }
}

type updateCartItemQuantityParams = {
  userId: string;
  productId: string;
  quantity: number;
}

export async function updateCartItemQuantity({userId, productId, quantity}: updateCartItemQuantityParams) {
  try {
    await connectToDatabase()

    const user = await User.findById(userId).populate('cart.product');
    
    if (!user) {
      throw new Error('User not found');
    }

    const cartItem = user.cart.find(
      (cartItem:any) => cartItem.product && cartItem.product.equals(productId)
    );

    if (!cartItem) {
      throw new Error('Product not found in the cart');
    }

    // Update the quantity
    cartItem.quantity += quantity;

    await user.save();

    return JSON.parse(JSON.stringify(user.cart))
  } catch (error) {
    handleError(error)
  }
}
