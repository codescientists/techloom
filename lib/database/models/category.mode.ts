import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },  
  parentCategory: { type: Schema.Types.ObjectId, ref: 'Category' } 
});

const Category = models.Category || model('Category', CategorySchema);

export default Category;