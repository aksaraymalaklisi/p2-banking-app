import { StyleSheet, View } from "react-native";
import { Redirect, Tabs } from "expo-router";
import { theme } from "../../constants/theme";
import { NuIcon, IconName } from "../../components/common/NuIcon";
import { useAuth } from "../../context/AuthContext";

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
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      backBehavior="none"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: styles.tabBarIconContainer,
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
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(24, 24, 24, 0.98)",
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    paddingTop: 0,
    paddingBottom: 0,
  },
  tabBarItem: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  tabBarIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 0,
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: theme.borderRadius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapperActive: {
    backgroundColor: theme.colors.primary,
  },
});
