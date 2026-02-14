import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Product } from "../../schemas/products.schema";

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const handlePress = () => {
    router.push(`/products/${product.id}`);
  };
  return (
    <Pressable style={styles.container} onPress={handlePress} android_ripple={{ color: Colors.primary }}>
      <View style={styles.content}>
        <Text>{product.name}</Text>
        <Text>ID: {product.id}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </Pressable>
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