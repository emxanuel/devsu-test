import { Product } from "@/schemas/products.schema";
import productsService from "@/services/products/products.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsKeys } from "./use-products";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: Product) => {
      const productExists = await productsService.validateProduct(product);
      if (productExists) {
        throw new Error("El producto ya existe");
      }
      return productsService.createProduct(product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsKeys.all });
    },
  });
}
