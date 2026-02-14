import productsService from "@/services/products/products.service";
import { useQuery } from "@tanstack/react-query";

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productsService.getProduct(id),
  });
}
