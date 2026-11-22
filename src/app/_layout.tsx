import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { theme } from "../constants/theme";
import { AccountProvider } from "../context/AccountContext";
import { AuthProvider } from "../context/AuthContext";

/**
 * Layout Raiz (Root Layout) da aplicação Nubank.
 * Envolve a aplicação no AccountProvider para compartilhamento de estado global.
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <AccountProvider>
        <StatusBar style="light" />

        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.colors.background },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="profile-modal"
            options={{
              presentation: "transparentModal",
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="menu-modal"
            options={{
              presentation: "transparentModal",
              animation: "slide_from_bottom",
            }}
          />
        </Stack>
      </AccountProvider>
    </AuthProvider>
  );
}
