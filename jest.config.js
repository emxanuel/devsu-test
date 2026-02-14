const reactNativePreset = require("react-native/jest-preset");
const jestExpoPreset = require("jest-expo/jest-preset");

module.exports = {
  ...reactNativePreset,
  ...jestExpoPreset,
  setupFiles: [...(reactNativePreset.setupFiles || [])],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@tanstack/query)/",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    ...(jestExpoPreset.moduleNameMapper || {}),
  },
  collectCoverageFrom: [
    "schemas/**/*.ts",
    "services/**/*.ts",
    "hooks/**/*.ts",
    "components/**/*.tsx",
    "!**/*.d.ts",
    "!**/*.interface.ts",
    "!**/env.schema.ts",
    "!**/node_modules/**",
    "!**/__tests__/**",
    "!components/header.tsx",
    "!components/home/new-product-button.tsx",
    "!components/home/search-input.tsx",
    "!components/products/products-form.tsx",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testMatch: ["**/__tests__/**/*.(test|spec).(ts|tsx)"],
  testPathIgnorePatterns: ["/node_modules/"],
};
