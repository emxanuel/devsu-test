import { logger } from "@/config/logger";
import Colors from "@/constants/theme";
import { useCreateProduct } from "@/hooks/use-create-products";
import { Product, productsFormResolver } from "@/schemas/products.schema";
import { router } from "expo-router";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function ProductsForm() {
  const createProduct = useCreateProduct();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    resolver: productsFormResolver,
    defaultValues: {
      id: "",
      name: "",
      description: "",
      logo: "",
      date_release: "",
      date_revision: "",
    },
  });

  const onSubmit = (data: Product) => {
    const product = {
      ...data,
      date_release: new Date(data.date_release).toISOString(),
      date_revision: new Date(data.date_revision).toISOString(),
    };
    createProduct.mutate(product, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  logger.debug("createProduct", createProduct);

  return (
    <View style={styles.container}>
      {createProduct.isPending && (
        <View style={styles.savingOverlay}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.savingText}>Guardando...</Text>
        </View>
      )}
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
        {createProduct.isError && (
          <Text style={styles.mutationError}>
            {createProduct.error?.message ?? "Error al crear el producto."}
          </Text>
        )}
        <Pressable
          style={[styles.submitButton, createProduct.isPending && styles.submitButtonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={createProduct.isPending}
        >
          {createProduct.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Enviar formulario</Text>
          )}
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 16,
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
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: Colors.foreground,
  },
});
