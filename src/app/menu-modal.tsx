import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, type Href } from "expo-router";
import { theme } from "../constants/theme";
import { NuIcon, type IconName } from "../components/common/NuIcon";

/**
 * Modal de Menu Hambúrguer - Tela 6 do aplicativo.
 * Aberto ao clicar no ícone ☰ do cabeçalho.
 */
export default function MenuModal() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const menuSections = [
    { icon: "card", title: "Conta", href: "/account" },
    { icon: "card", title: "Cartão de crédito", href: "/cards" },
    { icon: "loan", title: "Empréstimos", href: "/loans" },
    { icon: "boxes", title: "Caixinhas", href: "/(tabs)/investments" },
    { icon: "dollar", title: "Investimentos", href: "/(tabs)/investments" },
    { icon: "barcode", title: "Assistente de Pagamentos", href: "/payments" },
    { icon: "arrows", title: "Extrato", href: "/activity" },
    { icon: "pix", title: "Área Pix", href: "/pix" },
  ] satisfies { icon: IconName; title: string; href: Href }[];
  const filteredSections = menuSections.filter((item) =>
    item.title.toLocaleLowerCase("pt-BR").includes(query.trim().toLocaleLowerCase("pt-BR"))
  );

  return (
    <View style={styles.overlay}>
      <SafeAreaView style={styles.sheetContainer} edges={["bottom"]}>
        {/* Barra Superior */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <NuIcon name="close" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Menu</Text>
          <View style={{ width: 40 }} />
        </View>

      {/* Campo de Busca */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <NuIcon name="search" size={18} color={theme.colors.textSecondary} />
          <TextInput
            placeholder="Buscar"
            placeholderTextColor={theme.colors.textSecondary}
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>

      {/* Lista de Itens do Menu */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {filteredSections.map((item) => (
          <TouchableOpacity
            key={item.title}
            style={styles.menuRow}
            activeOpacity={0.7}
            onPress={() => router.dismissTo(item.href)}
          >
            <View style={styles.menuRowLeft}>
              <NuIcon name={item.icon} size={20} color={theme.colors.textSecondary} />
              <Text style={styles.menuRowTitle}>{item.title}</Text>
            </View>
            <NuIcon name="chevron-right" size={18} color={theme.colors.textMuted} />
          </TouchableOpacity>
        ))}
        {filteredSections.length === 0 ? (
          <Text style={styles.emptySearch}>Nenhum serviço encontrado.</Text>
        ) : null}
      </ScrollView>

      {/* Rodapé com Atalhos Rápidos */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerIconBtn}
          activeOpacity={0.7}
          onPress={() => router.dismissTo("/account")}
        >
          <NuIcon name="settings" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerIconBtn}
          activeOpacity={0.7}
          onPress={() => router.dismissTo("/account")}
        >
          <NuIcon name="user" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerIconBtn}
          activeOpacity={0.7}
          onPress={() =>
            Alert.alert(
              "Ajuda",
              "Consulte o extrato ou a área Pix para ver como a demonstração funciona."
            )
          }
        >
          <NuIcon name="help" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.securityPill}
          activeOpacity={0.8}
          onPress={() =>
            Alert.alert("Segurança", "Esta aplicação é uma demonstração acadêmica.")
          }
        >
          <NuIcon name="shield" size={16} color="#FFFFFF" />
          <Text style={styles.securityPillText}>Segurança</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    flex: 1,
    marginTop: 56,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: "700",
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.md,
    height: 46,
    gap: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.sm,
  },
  listContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  emptySearch: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
    paddingVertical: theme.spacing.md,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  menuRowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  menuRowTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    gap: theme.spacing.sm,
  },
  footerIconBtn: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
  },
  securityPill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.full,
    height: 44,
    gap: theme.spacing.xs,
  },
  securityPillText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: "700",
  },
});
