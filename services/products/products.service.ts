import { apiClient } from "@/config/api-client";
import { Product } from "@/schemas/products.schema";
import {
  CreateProductResponse,
  DeleteProductResponse,
  GetProductsResponse,
  UpdateProductResponse,
} from "./products.interface";

export class ProductsService {
  async getProducts() {
    const response = await apiClient.get<GetProductsResponse>("/products");
    return response.data;
  }

  async getProduct(id: string) {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  }

  async validateProduct(product: Product) {
    const response = await apiClient.get<boolean>(
      `/products/verification/${product.id}`,
    );
    return response.data;
  }

  async createProduct(product: Product) {
    const response = await apiClient.post<CreateProductResponse>(
      "/products",
      product,
    );
    return response.data;
  }

  async updateProduct(
    id: string,
    product: Omit<Product, "id"> & { id?: string },
  ) {
    const response = await apiClient.put<UpdateProductResponse>(
      `/products/${id}`,
      { ...product, id },
    );
    return response.data;
  }

  async deleteProduct(id: string) {
    const response = await apiClient.delete<DeleteProductResponse>(
      `/products/${id}`,
    );
    return response.data;
  }
}

const productsService = new ProductsService();

export default productsService;
