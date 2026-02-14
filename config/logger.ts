export const logger = {
  info: (message: unknown, ...args: unknown[]) => {
    console.log("[INFO]", new Date().toISOString(), message, ...args);
  },
  error: (message: unknown, ...args: unknown[]) => {
    console.error("[ERROR]", new Date().toISOString(), message, ...args);
  },
  warn: (message: unknown, ...args: unknown[]) => {
    console.warn("[WARN]", new Date().toISOString(), message, ...args);
  },
  debug: (message: unknown, ...args: unknown[]) => {
    console.debug("[DEBUG]", new Date().toISOString(), message, ...args);
  },
};
