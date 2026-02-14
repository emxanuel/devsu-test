import { FlatList, StyleSheet, Text, View } from "react-native";
import { Product } from "../../schemas/products.schema";
import NewProductButton from "./new-product-button";
import ProductItem from "./product-item";

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
}

function ProductListSkeleton() {
  return (
    <View style={styles.skeletonList}>
      {[1, 2, 3, 4, 5].map((i) => (
        <View key={i} style={styles.skeletonRow}>
          <View style={styles.skeletonLine} />
          <View style={[styles.skeletonLine, styles.skeletonLineShort]} />
        </View>
      ))}
    </View>
  );
}

export default function ProductList({ products, isLoading = false }: ProductListProps) {
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ProductListSkeleton />
      ) : products.length > 0 ? (
        <FlatList
          data={products}
          style={styles.list}
          renderItem={({ item }) => <ProductItem product={item} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.emptyText}>No tienes productos creados</Text>
      )}
      <NewProductButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    gap: 16,
  },
  list: {
    flex: 1,
    width: "100%",
    borderTopWidth: 1,
    borderColor: '#ccc',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 8,
  },
  emptyText: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 24,
  },
  skeletonList: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
  },
  skeletonRow: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: "#e8e8e8",
    borderRadius: 8,
  },
  skeletonLine: {
    height: 14,
    backgroundColor: "#d0d0d0",
    borderRadius: 4,
    marginBottom: 6,
  },
  skeletonLineShort: {
    width: "60%",
    marginBottom: 0,
  },
});