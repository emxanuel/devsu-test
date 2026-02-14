import type { Resolver } from "react-hook-form";
import { z } from "zod";

export const productsSchema = z.object({
  id: z
    .string()
    .min(3, "El ID debe tener al menos 3 caracteres")
    .max(10, "Máximo 10 caracteres"),
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "Máximo 100 caracteres"),
  description: z
    .string()
    .min(1, "La descripción es requerida")
    .max(500, "Máximo 500 caracteres"),
  logo: z
    .string()
    .min(1, "El logo (URL) es requerido")
    .url("Debe ser una URL válida"),
  date_release: z
    .string()
    .min(1, "La fecha de release es requerida")
    .refine((v) => !Number.isNaN(Date.parse(v)), "Fecha inválida"),
  date_revision: z
    .string()
    .min(1, "La fecha de revisión es requerida")
    .refine((v) => !Number.isNaN(Date.parse(v)), "Fecha inválida"),
});

export type Product = z.infer<typeof productsSchema>;

/** Convierte errores de Zod al formato de react-hook-form (evita que ZodError se lance sin capturar). */
export const productsFormResolver: Resolver<Product> = async (values) => {
  const result = productsSchema.safeParse(values);
  if (result.success) {
    return { values: result.data, errors: {} };
  }
  const errors: Record<string, { type: string; message: string }> = {};
  const issues = result.error.issues ?? (result.error as unknown as { errors?: { path: (string | number)[]; message: string }[] }).errors ?? [];
  for (const issue of issues) {
    const key = issue.path[0] != null ? String(issue.path[0]) : "";
    if (key && !errors[key]) {
      errors[key] = { type: "validation", message: issue.message };
    }
  }
  return { values: {}, errors };
};
