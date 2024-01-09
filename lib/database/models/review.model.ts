import { Schema, model, models } from "mongoose";
import { IProduct } from "./product.model";

export interface IReview extends Document {
    _id: string;
    user: {
        _id: string;
        clerkId: string;
        name: string;
        email: string;
        photo: string;
    };
    product: IProduct;
    rating: number;
    text: string;
}

const ReviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true },
    text: { type: String },
});
 

const Review = models.Review || model('Review', ReviewSchema);

export default Review;