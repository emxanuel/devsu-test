import { fireEvent, render, screen } from "@testing-library/react-native";
import DeleteProductModal from "@/components/products/delete-product-modal";

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

describe("DeleteProductModal", () => {
  it("renders product name and message when visible", () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    render(
      <DeleteProductModal
        visible
        productName="Test Product"
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );
    expect(screen.getByText(/Estás seguro de eliminar el producto Test Product/)).toBeOnTheScreen();
  });

  it("calls onClose when Cancelar is pressed", () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    render(
      <DeleteProductModal
        visible
        productName="X"
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );
    fireEvent.press(screen.getByText("Cancelar"));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onConfirm when Confirmar is pressed", () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    render(
      <DeleteProductModal
        visible
        productName="X"
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );
    fireEvent.press(screen.getByText("Confirmar"));
    expect(onConfirm).toHaveBeenCalled();
  });

  it("hides Confirmar text when isPending is true", () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    render(
      <DeleteProductModal
        visible
        productName="X"
        onClose={onClose}
        onConfirm={onConfirm}
        isPending
      />,
    );
    expect(screen.queryByText("Confirmar")).toBeNull();
  });

});
