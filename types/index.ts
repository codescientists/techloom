import { IProduct } from "@/lib/database/models/product.model";
import stripe from "stripe";

// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string;
    name: string;
    email: string;
    photo: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zipcode: string;
    };
  }
  

export type UpdateUserParams = {
    name?: string;
    password?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zipcode?: string;
    };
}


// CATEGORY PARAMS
export type createCategoryParams = {
  name: string;
  slug: string;
  parentCategory?: string;
}

export type updateCategoryParams = {
  categoryId: string;
  name: string;
}

// PRODUCT PARAMS
export type createProductParams = {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: string;
  path: string;
}

export type UpdateProductParams = {
  productId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: string;
  path: string;
}

export type getAllProductsParams = {
  query: string;
  limit: number;
  page: number;
  category: string;
}



export type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// REVIEW PARAMS
export type createReviewParams = {
  userId:string;
  productId: string;
  rating: number;
  comment: string;
  path: string;
}


// ORDER PARAMS
export type CheckoutOrderParams = {
  cart: [
    {
      product: IProduct;
      quantity: number
    }
  ]
  buyerId: string
}

export type createOrderParams = {
  orderId: string;
  shippingAddress: stripe.Checkout.Session.ShippingDetails | null;
}
