import { z } from "zod";

export const envSchema = z.object({
  EXPO_PUBLIC_API_BASE_URL: z.url(),
});

export type EnvSchema = z.infer<typeof envSchema>;
