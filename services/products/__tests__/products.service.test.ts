import { apiClient } from "@/config/api-client";
import productsService from "@/services/products/products.service";

jest.mock("@/config/api-client", () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockedApi = apiClient as jest.Mocked<typeof apiClient>;

describe("ProductsService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("getProducts calls GET /products and returns response.data", async () => {
    const data = { data: [] };
    mockedApi.get.mockResolvedValue({ data } as never);
    const result = await productsService.getProducts();
    expect(mockedApi.get).toHaveBeenCalledWith("/products");
    expect(result).toEqual(data);
  });

  it("getProduct calls GET /products/:id and returns response.data", async () => {
    const product = { id: "123", name: "Test" };
    mockedApi.get.mockResolvedValue({ data: product } as never);
    const result = await productsService.getProduct("123");
    expect(mockedApi.get).toHaveBeenCalledWith("/products/123");
    expect(result).toEqual(product);
  });

  it("validateProduct calls GET /products/verification/:id and returns response.data", async () => {
    mockedApi.get.mockResolvedValue({ data: true } as never);
    const result = await productsService.validateProduct({ id: "abc", name: "", description: "", logo: "https://x.com", date_release: "", date_revision: "" });
    expect(mockedApi.get).toHaveBeenCalledWith("/products/verification/abc");
    expect(result).toBe(true);
  });

  it("createProduct calls POST /products with product and returns response.data", async () => {
    const product = { id: "new", name: "New", description: "D", logo: "https://x.com", date_release: "2025-01-01", date_revision: "2026-01-01" };
    const responseData = { message: "ok", data: product };
    mockedApi.post.mockResolvedValue({ data: responseData } as never);
    const result = await productsService.createProduct(product);
    expect(mockedApi.post).toHaveBeenCalledWith("/products", product);
    expect(result).toEqual(responseData);
  });

  it("updateProduct calls PUT /products/:id with body and returns response.data", async () => {
    const id = "123";
    const body = { name: "Updated", description: "D", logo: "https://x.com", date_release: "2025-01-01", date_revision: "2026-01-01" };
    const responseData = { message: "ok", data: { ...body, id } };
    mockedApi.put.mockResolvedValue({ data: responseData } as never);
    const result = await productsService.updateProduct(id, body);
    expect(mockedApi.put).toHaveBeenCalledWith(`/products/${id}`, { ...body, id });
    expect(result).toEqual(responseData);
  });

  it("deleteProduct calls DELETE /products/:id and returns response.data", async () => {
    const responseData = { message: "removed" };
    mockedApi.delete.mockResolvedValue({ data: responseData } as never);
    const result = await productsService.deleteProduct("123");
    expect(mockedApi.delete).toHaveBeenCalledWith("/products/123");
    expect(result).toEqual(responseData);
  });
});
