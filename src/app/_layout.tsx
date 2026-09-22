import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { theme } from "../constants/theme";
import { AccountProvider } from "../context/AccountContext";

/**
 * Layout Raiz (Root Layout) da aplicação Nubank.
 * Envolve a aplicação no AccountProvider para compartilhamento de estado global.
 */
export default function RootLayout() {
  return (
    <AccountProvider>
      {/* Ícones de relógio e bateria brancos para combinar com o Dark Mode */}
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        {/* Grupo principal de abas inferiores */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Modal de Perfil/Conta (desliza de baixo para cima) */}
        <Stack.Screen
          name="profile-modal"
          options={{
            presentation: "modal",
            headerShown: false,
            animation: "slide_from_bottom",
          }}
        />

        {/* Modal de Menu Hambúrguer (desliza de baixo para cima) */}
        <Stack.Screen
          name="menu-modal"
          options={{
            presentation: "modal",
            headerShown: false,
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    </AccountProvider>
  );
}
