import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true },
    text: { type: String },
});
 

const Review = models.Review || model('Review', ReviewSchema);

export default Review;