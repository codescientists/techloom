import { Schema, model, models } from "mongoose";

export interface IProduct extends Omit<Document, 'images'> {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    category: {
        _id: string;
        name: string;
    };
    reviews: Array<{
        _id: string;
        rating: number;
        text: string;
    }>;
}

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    images: [{ type: String }],
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});
  

const Product = models.Product || model('Product', ProductSchema);

export default Product;