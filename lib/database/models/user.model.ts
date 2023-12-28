import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipcode: { type: String },
    },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
})

const User = models.User || model('User', UserSchema);

export default User;