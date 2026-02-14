import { envSchema } from "@/schemas/env.schema";
import { treeifyError } from "zod";

const parsedEnv = envSchema.safeParse({
  EXPO_PUBLIC_API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
});

if (!parsedEnv.success) {
  throw new Error(
    `Invalid environment variables: ${JSON.stringify(treeifyError(parsedEnv.error))}`,
  );
}

export const env = {
  apiBaseUrl: parsedEnv.data.EXPO_PUBLIC_API_BASE_URL,
};
