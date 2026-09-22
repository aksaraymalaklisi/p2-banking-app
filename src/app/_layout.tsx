import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { theme } from "../constants/theme";

/**
 * Layout Raiz (Root Layout) da aplicação Nubank.
 * Define o container Stack nativo, configura a barra de status clara (light)
 * e declara as rotas para o grupo de abas e os modais deslizantes.
 */
export default function RootLayout() {
  return (
    <>
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
    </>
  );
}
