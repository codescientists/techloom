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