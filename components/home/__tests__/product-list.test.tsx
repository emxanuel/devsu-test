import { render, screen } from "@testing-library/react-native";
import ProductList from "@/components/home/product-list";
import { Product } from "@/schemas/products.schema";

jest.mock("expo-router", () => ({
  router: { push: jest.fn(), back: jest.fn() },
  useLocalSearchParams: () => ({}),
}));

jest.mock("@/components/home/new-product-button", () => {
  const { Text } = require("react-native");
  return function MockNewProductButton() {
    return <Text>NewProductButton</Text>;
  };
});

const products: Product[] = [
  {
    id: "1",
    name: "Product One",
    description: "D1",
    logo: "https://x.com/1",
    date_release: "2025-01-01",
    date_revision: "2026-01-01",
  },
];

describe("ProductList", () => {
  it("shows empty message when products array is empty", () => {
    render(<ProductList products={[]} />);
    expect(screen.getByText("No tienes productos creados")).toBeOnTheScreen();
  });

  it("renders product items when products are provided", () => {
    render(<ProductList products={products} />);
    expect(screen.getByText("Product One")).toBeOnTheScreen();
    expect(screen.getByText("ID: 1")).toBeOnTheScreen();
  });

  it("does not show empty message when isLoading is true", () => {
    render(<ProductList products={[]} isLoading />);
    expect(screen.queryByText("No tienes productos creados")).toBeNull();
  });
});
