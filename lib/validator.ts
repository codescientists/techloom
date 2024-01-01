import * as z from "zod"

export const productFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
  images: z.array(z.string()), 
  price: z.coerce.number(),
  stock: z.coerce.number(),
  category: z.string(),
});
