import { metadata } from './../../app/layout';
"use server"

import { CheckoutOrderParams, createOrderParams } from '@/types';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import User from '../database/models/user.model';
import Product from '../database/models/product.model';
import Order from '../database/models/order.model';
import { connectToDatabase } from '../database';

export const checkoutOrder = async (order: CheckoutOrderParams) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!); 

    const lineItems = order.cart.map(cartItem => ({
        price_data: {
          currency: 'inr',
          unit_amount: cartItem.product.price * 100,
          product_data: {
            name: cartItem.product.name,
            images: cartItem.product.images,
            metadata: {
              productId: cartItem.product._id,
            }
          }
        },
        quantity: cartItem.quantity
    }));    

    try {
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        metadata: {
          buyerId: order.buyerId,
        },
        mode: 'payment',
        billing_address_collection: 'required',
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
      });
  
      redirect(session.url!)
      
    } catch (error) {
      throw error;
    }
  }

  
export const createOrder = async (order: createOrderParams) => {
    try {
      await connectToDatabase();

      const user = await User.findById(order.buyerId);
    
      if (!user) {
        throw new Error('User not found');
      }

      // Validate product existence and calculate total price
      // const orderedProducts = await Promise.all(order?.products?.data?.map(async ({ price, quantity }) => {
      //   // Assuming you have a Product model
      //   const product = await Product.findById(price_data.product_data.metadata.productId);

      //   if (!product) {
      //     throw new Error(`Product with ID ${price_data.product_data.metadata.productId} not found`);
      //   }

      //   // For simplicity, we'll assume the product exists
      //   return {
      //     products: product._id,
      //     quantity,
      //   };
      // }));

      // Create a new order  
      const newOrder = new Order({
        user: order.buyerId,
        // products: orderedProducts,
        totalPrice: order.totalAmount,
        shippingAddress: {
          street: order?.shippingAddress?.address?.line1,
          city: order?.shippingAddress?.address?.city,
          state: order?.shippingAddress?.address?.state,
          pincode: order?.shippingAddress?.address?.postal_code,
        },
        status: 'placed',
        createdAt: order.createdAt,
      });

      // Save the order to the database
      await newOrder.save();

      // Update the user's orders array with the new order
      user.orders.push(newOrder._id);
      await user.save();

        
    } catch (error) {
      throw error;
    }
}



