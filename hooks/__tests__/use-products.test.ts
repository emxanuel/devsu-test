import React from "react";
import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProducts } from "@/hooks/use-products";
import productsService from "@/services/products/products.service";

jest.mock("@/services/products/products.service");

const mockedService = productsService as jest.Mocked<typeof productsService>;

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

describe("useProducts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls getProducts and returns data", async () => {
    mockedService.getProducts.mockResolvedValue({ data: [] });
    const { result } = renderHook(() => useProducts(), { wrapper: createWrapper() });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedService.getProducts).toHaveBeenCalled();
    expect(result.current.data).toEqual({ data: [] });
  });
});
