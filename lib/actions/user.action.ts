'use server'

import { CreateUserParams, UpdateUserParams } from "@/types"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import { handleError } from "../utils"
import { revalidatePath } from "next/cache"
import Order from "../database/models/order.model"

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
    
        const user = await User.find({ clerkId: userId });
        
        return JSON.parse(JSON.stringify(user))
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