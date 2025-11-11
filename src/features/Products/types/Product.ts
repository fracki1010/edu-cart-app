export interface ICategory {
    id: number;
    name: string;
}


export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  imageUrl?: string;
  category: string;
}

export type NewProductPayload = {
  name: string;
  description: string;
  price: number;
  stock: number;
  rating: number;
  category_id: number;
};

export type UpdateProductPayload = Partial<NewProductPayload>;
