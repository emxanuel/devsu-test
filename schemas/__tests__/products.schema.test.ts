import {
  productsFormResolver,
  productsSchema,
} from "@/schemas/products.schema";

const validProduct = {
  id: "abc",
  name: "Product name",
  description: "Description",
  logo: "https://example.com/logo.png",
  date_release: "2025-01-15",
  date_revision: "2026-01-15",
};

describe("productsSchema", () => {
  it("parses valid product", () => {
    const result = productsSchema.safeParse(validProduct);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validProduct);
    }
  });

  it("rejects id shorter than 3 characters", () => {
    const result = productsSchema.safeParse({
      ...validProduct,
      id: "ab",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues?.[0] ?? result.error.errors?.[0];
      expect(issue?.message).toMatch(/al menos 3 caracteres/);
    }
  });

  it("rejects id longer than 10 characters", () => {
    const result = productsSchema.safeParse({
      ...validProduct,
      id: "abcdefghijk",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues?.[0] ?? result.error.errors?.[0];
      expect(issue?.message).toMatch(/Máximo 10 caracteres/);
    }
  });

  it("rejects empty name", () => {
    const result = productsSchema.safeParse({
      ...validProduct,
      name: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues?.[0] ?? result.error.errors?.[0];
      expect(issue?.message).toMatch(/nombre es requerido/);
    }
  });

  it("rejects invalid logo URL", () => {
    const result = productsSchema.safeParse({
      ...validProduct,
      logo: "not-a-url",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues?.[0] ?? result.error.errors?.[0];
      expect(issue?.message).toMatch(/URL válida/);
    }
  });

  it("rejects invalid date_release", () => {
    const result = productsSchema.safeParse({
      ...validProduct,
      date_release: "invalid-date",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues?.[0] ?? result.error.errors?.[0];
      expect(issue?.message).toMatch(/Fecha inválida/);
    }
  });
});

describe("productsFormResolver", () => {
  it("returns values and empty errors for valid input", async () => {
    const result = await productsFormResolver(validProduct, undefined, undefined as never);
    expect(result.errors).toEqual({});
    expect(result.values).toEqual(validProduct);
  });

  it("returns errors for invalid input", async () => {
    const invalid = {
      ...validProduct,
      id: "x",
      name: "",
    };
    const result = await productsFormResolver(invalid, undefined, undefined as never);
    expect(result.values).toEqual({});
    expect(Object.keys(result.errors).length).toBeGreaterThan(0);
    expect(result.errors.id?.message).toBeDefined();
    expect(result.errors.name?.message).toBeDefined();
  });

  it("maps multiple issues to errors by path key", async () => {
    const invalid = {
      id: "ab",
      name: "",
      description: "d",
      logo: "not-url",
      date_release: "x",
      date_revision: "y",
    };
    const result = await productsFormResolver(invalid, undefined, undefined as never);
    expect(result.values).toEqual({});
    expect(result.errors.id).toBeDefined();
    expect(result.errors.name).toBeDefined();
    expect(result.errors.logo).toBeDefined();
  });
});
