"use server"

import { CheckoutOrderParams, createOrderParams } from '@/types';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import User from '../database/models/user.model';
import Order from '../database/models/order.model';
import { connectToDatabase } from '../database';

export const checkoutOrder = async ({buyerId, cart}: CheckoutOrderParams) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!); 

    const lineItems = cart.map(cartItem => ({
        price_data: {
          currency: 'inr',
          unit_amount: cartItem.product.price * 100,
          product_data: {
            name: cartItem.product.name,
            images: cartItem.product.images,
          }
        },
        quantity: cartItem.quantity
    })); 
    
    try {
      await connectToDatabase();

      const user = await User.findById(buyerId);
    
      if (!user) {
        throw new Error('User not found');
      }
      
      // Create a new order  
      const order = new Order({
        user: buyerId,
        products: cart,
        status: 'unpaid',
        isPaid: false,
        createdAt: new Date(),
      });

      // Save the order to the database
      await order.save();

      // Update the user's orders array with the new order
      user.orders.push(order._id);
      await user.save();

      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        metadata: {
          buyerId: buyerId,
          orderId: (order._id).toString(),
        },
        mode: 'payment',
        shipping_address_collection: { "allowed_countries" : ["IN", "US"]},
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
      });
  
      redirect(session.url!)
      
    } catch (error) {
      throw error;
    }
  }

  
export const updateOrder = async ({orderId, shippingAddress}: createOrderParams) => {
    try {
      await connectToDatabase();

      // Updating the order with shipping address
      const updatedOrder = await Order.updateOne({_id: orderId}, {
        shippingAddress: {
          street: shippingAddress?.address?.line1,
          city: shippingAddress?.address?.city,
          state: shippingAddress?.address?.state,
          pincode: shippingAddress?.address?.postal_code,
        },
        status: 'placed'
      });
      
      return JSON.parse(JSON.stringify(updatedOrder))
        
    } catch (error) {
      throw error;
    }
}



