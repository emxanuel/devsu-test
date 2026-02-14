import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import "react-native-reanimated";

import Header from "@/components/header";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ header: () => <Header /> }}>
        <Stack.Screen name="index" options={{ headerShown: true }} />
        <Stack.Screen name="products/new" options={{ headerShown: true }} />
      </Stack>
    </QueryClientProvider>
  );
}
