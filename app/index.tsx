import ProductList from "@/components/home/product-list";
import SearchInput from "@/components/home/search-input";
import { BorderWidths } from "@/constants/theme";
import { useProducts } from "@/hooks/use-products";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

export default function HomePage() {
  const { data, isLoading, isFetching, isError, error, refetch } = useProducts();
  const products = data?.data ?? [];

  return (
    <View style={styles.container}>
      <SearchInput />
      {isFetching && !isLoading && (
        <View style={styles.refetchBar}>
          <ActivityIndicator size="small" />
          <Text style={styles.refetchText}>Actualizando...</Text>
        </View>
      )}
      {isError && (
        <View style={styles.centered}>
          <Text style={styles.errorText}>
            Error al cargar productos. {error?.message ?? "Intenta de nuevo."}
          </Text>
          <Pressable style={styles.retryButton} onPress={() => refetch()}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </Pressable>
        </View>
      )}
      {!isError && (
        <ProductList products={products} isLoading={isLoading} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  refetchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 6,
    backgroundColor: "#f0f0f0",
  },
  refetchText: {
    fontSize: 12,
    color: "#666",
  },
  errorText: {
    fontSize: 14,
    color: "#c00",
    textAlign: "center",
  },
  retryButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0066cc",
    borderRadius: BorderWidths.button,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});