import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photo: {type: String},
    phoneNumber: {type: String},
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        pincode: { type: String },
    },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    cart: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 }, 
        }
    ],
    admin: {
        type: Boolean,
        default: false, // Default new users to non-admin
    },    
})

const User = models.User || model('User', UserSchema);

export default User;