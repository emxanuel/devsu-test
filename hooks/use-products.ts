import productsService from "@/services/products/products.service";
import { useQuery } from "@tanstack/react-query";

export const productsKeys = {
  all: ["products"] as const,
};

export function useProducts() {
  return useQuery({
    queryKey: productsKeys.all,
    queryFn: () => productsService.getProducts(),
  });
}
