import type {
  IProduct,
  NewProductPayload,
  UpdateProductPayload,
} from "../types/Product";

export interface ProductApi {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image_url?: string;
  category: { id: number; name: string } | null; // objeto único, no array
}

export function toProduct(api: ProductApi): IProduct {
  return {
    id: api.id,
    name: api.name,
    description: api.description,
    price: api.price,
    rating: api.rating,
    imageUrl: api.image_url,
    category: api.category?.name || "Sin categoría",
  };
}


// 🧭 Frontend → Backend (crear)
export function toProductApiCreate(
  payload: NewProductPayload
): Partial<ProductApi> & { category_id?: number } {
  return {
    name: payload.name,
    description: payload.description,
    price: payload.price,
    rating: payload.rating,
    // el backend espera una key como "category_id"
    // si FastAPI espera otra (p. ej. categories_ids), ajustamos luego
    category_id: payload.category_id,
  };
}

// 🧭 Frontend → Backend (actualizar)
export function toProductApiUpdate(
  payload: UpdateProductPayload
): Partial<ProductApi> & { category_id?: number } {
  return {
    ...(payload.name && { name: payload.name }),
    ...(payload.description && { description: payload.description }),
    ...(payload.price && { price: payload.price }),
    ...(payload.rating && { rating: payload.rating }),
    ...(payload.category_id && { category_id: payload.category_id }),
  };
}
