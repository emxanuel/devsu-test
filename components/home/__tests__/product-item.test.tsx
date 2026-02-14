import { fireEvent, render, screen } from "@testing-library/react-native";
import ProductItem from "@/components/home/product-item";
import { Product } from "@/schemas/products.schema";

const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  router: {
    push: (...args: unknown[]) => mockPush(...args),
    back: jest.fn(),
  },
  useLocalSearchParams: () => ({}),
}));

const product: Product = {
  id: "123",
  name: "Test Product",
  description: "Desc",
  logo: "https://x.com",
  date_release: "2025-01-01",
  date_revision: "2026-01-01",
};

describe("ProductItem", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders product name and id", () => {
    render(<ProductItem product={product} />);
    expect(screen.getByText("Test Product")).toBeOnTheScreen();
    expect(screen.getByText("ID: 123")).toBeOnTheScreen();
  });

  it("calls router.push with product detail route on press", () => {
    render(<ProductItem product={product} />);
    fireEvent.press(screen.getByText("Test Product"));
    expect(mockPush).toHaveBeenCalledWith("/products/123");
  });
});
