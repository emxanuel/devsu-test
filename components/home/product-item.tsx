import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Product } from "../../schemas/products.schema";

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>{product.name}</Text>
        <Text>ID: {product.id}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  content: {
    flex: 1,
  },
});