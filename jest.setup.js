// Env required by config/env.ts when any code imports api-client or services
process.env.EXPO_PUBLIC_API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || "https://example.com";

// Avoid loading expo-modules-core; use no-op components for @expo/vector-icons
jest.mock("@expo/vector-icons", () => {
  return {
    Ionicons: function Ionicons() {
      return null;
    },
    MaterialIcons: function MaterialIcons() {
      return null;
    },
  };
});

// Built-in jest matchers from @testing-library/react-native v12.4+
require("@testing-library/react-native/matchers");
