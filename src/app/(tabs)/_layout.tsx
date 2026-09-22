import React from "react";
import { StyleSheet, View } from "react-native";
import { Tabs } from "expo-router";
import { theme } from "../../constants/theme";
import { NuIcon, IconName } from "../../components/common/NuIcon";

/**
 * Componente que renderiza o ícone da aba.
 * No Nubank oficial, a aba ativa fica dentro de um círculo roxo destacado.
 */
function TabBarIcon({
  name,
  focused,
}: {
  name: IconName;
  focused: boolean;
}) {
  return (
    <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
      <NuIcon
        name={name}
        size={20}
        color={focused ? "#FFFFFF" : theme.colors.textSecondary}
      />
    </View>
  );
}

/**
 * Navegador de Abas Inferiores (Bottom Tabs).
 * Configurado com `backBehavior="none"` para que o botão 'voltar' do sistema
 * saia da aplicação em vez de retroceder entre abas.
 */
export default function TabsLayout() {
  return (
    <Tabs
      backBehavior="none"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {/* Aba 1: Principal (Setas) */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Principal",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="arrows" focused={focused} />
          ),
        }}
      />

      {/* Aba 2: Investimentos (Cifrão) */}
      <Tabs.Screen
        name="investments"
        options={{
          title: "Investimentos",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="dollar" focused={focused} />
          ),
        }}
      />

      {/* Aba 3: Vantagens (Presente) */}
      <Tabs.Screen
        name="shopping"
        options={{
          title: "Vantagens",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="gift" focused={focused} />
          ),
        }}
      />

      {/* Aba 4: NuCel (Celular) */}
      <Tabs.Screen
        name="nucel"
        options={{
          title: "NuCel",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="phone" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.background,
    borderTopColor: theme.colors.surfaceHighlight,
    borderTopWidth: 1,
    height: 64,
    paddingTop: 8,
    paddingBottom: 8,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapperActive: {
    backgroundColor: theme.colors.primary,
  },
});
