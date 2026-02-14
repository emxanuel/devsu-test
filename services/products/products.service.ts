import { apiClient } from "@/config/api-client";
import { logger } from "@/config/logger";
import { Product } from "@/schemas/products.schema";
import {
  CreateProductResponse,
  GetProductsResponse,
} from "./products.interface";

export class ProductsService {
  async getProducts() {
    const response = await apiClient.get<GetProductsResponse>("/products");
    return response.data;
  }

  async validateProduct(product: Product) {
    const response = await apiClient.get<boolean>(
      `/products/verification/${product.id}`,
    );
    logger.info("validateProduct", response.data);
    return response.data;
  }

  async createProduct(product: Product) {
    const response = await apiClient.post<CreateProductResponse>(
      "/products",
      product,
    );
    return response.data;
  }
}

const productsService = new ProductsService();

export default productsService;
