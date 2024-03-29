import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
    }],
    shippingAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
    },
    status: { type: String, enum: ['unpaid', 'placed', 'shipped', 'delivered', 'cancelled'] },
    isPaid: { type: Boolean, required: true, default: false },
    createdAt: {type: Date},
});
  
  

const Order = models.Order || model('Order', OrderSchema);

export default Order;