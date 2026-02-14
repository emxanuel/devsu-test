import { BorderWidths, Colors } from "@/constants/theme";
import {
  useCreateProduct,
  useUpdateProduct,
} from "@/hooks/use-create-products";
import { Product, productsFormResolver } from "@/schemas/products.schema";
import { router } from "expo-router";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const emptyDefaults: Product = {
  id: "",
  name: "",
  description: "",
  logo: "",
  date_release: "",
  date_revision: "",
};

function productToDefaultValues(product: Product & { id?: string | number }): Product {
  return {
    id: String(product.id ?? ""),
    name: product.name ?? "",
    description: product.description ?? "",
    logo: product.logo ?? "",
    date_release: product.date_release?.slice(0, 10) ?? "",
    date_revision: product.date_revision?.slice(0, 10) ?? "",
  };
}

interface ProductsFormProps {
  product?: Product & { id?: string | number };
}

export default function ProductsForm({ product: initialProduct }: ProductsFormProps) {
  const isEdit = Boolean(initialProduct);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    resolver: productsFormResolver,
    defaultValues: initialProduct
      ? productToDefaultValues(initialProduct)
      : emptyDefaults,
  });

  const onSubmit = (data: Product) => {
    const payload = {
      ...data,
      date_release: new Date(data.date_release).toISOString(),
      date_revision: new Date(data.date_revision).toISOString(),
    };
    if (isEdit && initialProduct) {
      const id = String(initialProduct.id);
      updateProduct.mutate(
        { id, data: { ...payload, id } },
        {
          onSuccess: () => {
            router.back();
          },
        },
      );
    } else {
      createProduct.mutate(payload as Product, {
        onSuccess: () => {
          router.push("/");
        },
      });
    }
  };

  const isPending = createProduct.isPending || updateProduct.isPending;
  const isError = createProduct.isError || updateProduct.isError;
  const errorMessage =
    createProduct.error?.message ?? updateProduct.error?.message ?? "Error al guardar.";

  return (
    <View style={styles.container}>
      {isPending && (
        <View style={styles.savingOverlay}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.savingText}>Guardando...</Text>
        </View>
      )}
      <View style={styles.content}>
        <Controller
          control={control}
          name="id"
          render={({ field }: { field: ControllerRenderProps<Product, "id"> }) => (
            <View style={styles.field}>
              <Text style={styles.label}>ID</Text>
              <TextInput
                placeholder="ID del producto"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                editable={!isEdit}
                keyboardType="numeric"
                style={[styles.input, errors.id && styles.inputError]}
              />
              {errors.id && <Text style={styles.error}>{errors.id.message}</Text>}
            </View>
          )}
        />

          <Controller
            control={control}
            name="name"
            render={({ field }: { field: ControllerRenderProps<Product, "name"> }) => (
              <View style={styles.field}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                  placeholder="Nombre del producto"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  style={[styles.input, errors.name && styles.inputError]}
                />
                {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
              </View>
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field }: { field: ControllerRenderProps<Product, "description"> }) => (
              <View style={styles.field}>
                <Text style={styles.label}>Descripción</Text>
                <TextInput
                  placeholder="Descripción del producto"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  multiline
                  style={[styles.input, styles.textArea, errors.description && styles.inputError]}
                />
                {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}
              </View>
            )}
          />

          <Controller
            control={control}
            name="logo"
            render={({ field }: { field: ControllerRenderProps<Product, "logo"> }) => (
              <View style={styles.field}>
                <Text style={styles.label}>Logo</Text>
                <TextInput
                  placeholder="Logo del producto (URL)"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  autoCapitalize="none"
                  keyboardType="url"
                  style={[styles.input, errors.logo && styles.inputError]}
                />
                {errors.logo && <Text style={styles.error}>{errors.logo.message}</Text>}
              </View>
            )}
          />

          <Controller
            control={control}
            name="date_release"
            render={({ field }: { field: ControllerRenderProps<Product, "date_release"> }) => (
              <View style={styles.field}>
                <Text style={styles.label}>Fecha de release</Text>
                <TextInput
                  placeholder="Fecha de release (ej. 2025-01-15)"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  style={[styles.input, errors.date_release && styles.inputError]}
                />
                {errors.date_release && <Text style={styles.error}>{errors.date_release.message}</Text>}
              </View>
            )}
          />

          <Controller
            control={control}
            name="date_revision"
            render={({ field }: { field: ControllerRenderProps<Product, "date_revision"> }) => (
              <View style={styles.field}>
                <Text style={styles.label}>Fecha de revisión</Text>
                <TextInput
                  placeholder="Fecha de revisión (ej. 2026-01-15)"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  style={[styles.input, errors.date_revision && styles.inputError]}
                />
                {errors.date_revision && <Text style={styles.error}>{errors.date_revision.message}</Text>}
              </View>
            )}
          />
          {isError && (
            <Text style={styles.mutationError}>{errorMessage}</Text>
          )}
      </View>
      <Pressable
        style={[styles.submitButton, isPending && styles.submitButtonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
      >
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>
            {isEdit ? "Guardar cambios" : "Enviar formulario"}
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  savingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  savingText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  field: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  error: {
    color: "#c00",
    fontSize: 12,
    marginTop: 4,
  },
  inputError: {
    borderColor: "#c00",
    borderWidth: 1.5,
  },
  mutationError: {
    marginTop: 12,
    color: "#c00",
    fontSize: 12,
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: BorderWidths.button,
    alignItems: "center",
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: Colors.foreground,
  },
});
