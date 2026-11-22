import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { theme } from "../constants/theme";
import { AccountProvider } from "../context/AccountContext";
import { AuthProvider, useAuth } from "../context/AuthContext";

/**
 * Layout Raiz (Root Layout) da aplicação Nubank.
 * Envolve a aplicação no AccountProvider para compartilhamento de estado global.
 */
function RootNavigator() {
  const { user } = useAuth();

  return (
    <>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Protected guard={!user}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={Boolean(user)}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="account" />
          <Stack.Screen name="activity" />
          <Stack.Screen name="cards" />
          <Stack.Screen name="loans" />
          <Stack.Screen name="payments" />
          <Stack.Screen name="pix" />
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
        </Stack.Protected>
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AccountProvider>
        <RootNavigator />
      </AccountProvider>
    </AuthProvider>
  );
}
