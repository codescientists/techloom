import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
    }],
    totalPrice: { type: Number, required: true },
    shippingAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipcode: { type: String },
    },
    status: { type: String, enum: ['placed', 'shipped', 'delivered', 'cancelled'] },
});
  
  

const Order = models.Order || model('Order', OrderSchema);

export default Order;