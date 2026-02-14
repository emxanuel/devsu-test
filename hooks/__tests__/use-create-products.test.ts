import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useCreateProduct,
  useDeleteProduct,
  useUpdateProduct,
} from "@/hooks/use-create-products";
import productsService from "@/services/products/products.service";
import { Text } from "react-native";

jest.mock("@/services/products/products.service");

const mockedService = productsService as jest.Mocked<typeof productsService>;

function createWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

const product = { id: "new", name: "New", description: "D", logo: "https://x.com", date_release: "2025-01-01", date_revision: "2026-01-01" };

describe("useCreateProduct", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls validateProduct and createProduct on mutate", async () => {
    mockedService.validateProduct.mockResolvedValue(false);
    mockedService.createProduct.mockResolvedValue({ message: "ok", data: product });
    function TestComponent() {
      const { mutate } = useCreateProduct();
      return React.createElement(Text, { testID: "btn", onPress: () => mutate(product) }, "Create");
    }
    const Wrapper = createWrapper();
    const { getByTestId } = render(
      React.createElement(Wrapper, null, React.createElement(TestComponent)),
    );
    fireEvent.press(getByTestId("btn"));
    await waitFor(() => {
      expect(mockedService.validateProduct).toHaveBeenCalledWith(product);
    });
    await waitFor(() => {
      expect(mockedService.createProduct).toHaveBeenCalledWith(product);
    });
  });

  it("throws when product already exists", async () => {
    mockedService.validateProduct.mockResolvedValue(true);
    let mutationError: Error | null = null;
    function TestComponent() {
      const { mutate, error } = useCreateProduct();
      if (error) mutationError = error as Error;
      return React.createElement(Text, { testID: "btn", onPress: () => mutate(product) }, "Create");
    }
    const Wrapper = createWrapper();
    const { getByTestId } = render(
      React.createElement(Wrapper, null, React.createElement(TestComponent)),
    );
    fireEvent.press(getByTestId("btn"));
    await waitFor(() => {
      expect(mutationError).not.toBeNull();
    });
    expect(mutationError!.message).toBe("El producto ya existe");
    expect(mockedService.createProduct).not.toHaveBeenCalled();
  });
});

describe("useUpdateProduct", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls updateProduct on mutate", async () => {
    mockedService.updateProduct.mockResolvedValue({ message: "ok", data: product });
    const payload = { id: "123", data: { ...product, id: "123" } };
    function TestComponent() {
      const { mutate } = useUpdateProduct();
      return React.createElement(Text, { testID: "btn", onPress: () => mutate(payload) }, "Update");
    }
    const Wrapper = createWrapper();
    const { getByTestId } = render(
      React.createElement(Wrapper, null, React.createElement(TestComponent)),
    );
    fireEvent.press(getByTestId("btn"));
    await waitFor(() => {
      expect(mockedService.updateProduct).toHaveBeenCalledWith("123", payload.data);
    });
  });
});

describe("useDeleteProduct", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls deleteProduct on mutate", async () => {
    mockedService.deleteProduct.mockResolvedValue({ message: "removed" });
    function TestComponent() {
      const { mutate } = useDeleteProduct();
      return React.createElement(Text, { testID: "btn", onPress: () => mutate("123") }, "Delete");
    }
    const Wrapper = createWrapper();
    const { getByTestId } = render(
      React.createElement(Wrapper, null, React.createElement(TestComponent)),
    );
    fireEvent.press(getByTestId("btn"));
    await waitFor(() => {
      expect(mockedService.deleteProduct).toHaveBeenCalledWith("123");
    });
  });
});
