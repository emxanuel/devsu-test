import React from "react";
import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProduct } from "@/hooks/use-product";
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

describe("useProduct", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls getProduct with id and returns data", async () => {
    const product = {
      id: "123",
      name: "Test Product",
      description: "",
      logo: "",
      date_release: "",
      date_revision: "",
    };
    mockedService.getProduct.mockResolvedValue(product);
    const { result } = renderHook(() => useProduct("123"), { wrapper: createWrapper() });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedService.getProduct).toHaveBeenCalledWith("123");
    expect(result.current.data).toEqual(product);
  });
});
