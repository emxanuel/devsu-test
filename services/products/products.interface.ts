import { Product } from "@/schemas/products.schema";

export interface GetProductsResponse {
  data: Product[];
}

export interface CreateProductResponse {
  message: string;
  data: Product;
}

export interface UpdateProductResponse {
  message: string;
  data: Product;
}

export interface DeleteProductResponse {
  message: string;
}
