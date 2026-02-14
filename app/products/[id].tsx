import DeleteProductModal from "@/components/products/delete-product-modal";
import { BorderWidths, Colors, Paddings } from "@/constants/theme";
import { useDeleteProduct } from "@/hooks/use-create-products";
import { useProduct } from "@/hooks/use-product";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function SingleProductPage() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, error } = useProduct(id as string);
  const deleteProduct = useDeleteProduct();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  if (isLoading) {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!data) {
    router.back();
    return null;
  }

  const handleConfirmDelete = () => {
    deleteProduct.mutate(String(data.id), {
      onSuccess: () => {
        setDeleteModalVisible(false);
        router.back();
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>ID: {data.id}</Text>
          <Text>Información extra</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{data.name}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{data.description}</Text>
        </View>
        <View style={styles.logoContainer}>
          <Text style={styles.label}>Logo</Text>
          <Image source={{ uri: data.logo }} style={styles.logo} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Date Release</Text>
          <Text style={styles.value}>{new Date(data.date_release).toLocaleDateString()}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Date Revision</Text>
          <Text style={styles.value}>{new Date(data.date_revision).toLocaleDateString()}</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.editButton}
          onPress={() => router.push(`/products/${data.id}/edit`)}
        >
          <Text style={styles.editButtonText}>Editar</Text>
        </Pressable>
        <Pressable
          style={styles.deleteButton}
          onPress={() => setDeleteModalVisible(true)}
        >
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </Pressable>
      </View>

      <DeleteProductModal
        visible={deleteModalVisible}
        productName={data.name}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleConfirmDelete}
        isPending={deleteProduct.isPending}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  logo: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  logoContainer: {
    marginBottom: 16,
  },
  field: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    marginBottom: 40,
  },
  editButton: {
    backgroundColor: Colors.gray,
    padding: Paddings.button,
    borderRadius: BorderWidths.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    color: Colors.foreground,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: Colors.red,
    padding: Paddings.button,
    borderRadius: BorderWidths.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: Colors.foregroundLight,
    textAlign: 'center',
  },
  buttonsContainer: {
    gap: 8,
  },
});