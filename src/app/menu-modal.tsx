import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "../constants/theme";
import { NuIcon } from "../components/common/NuIcon";

/**
 * Modal de Menu Hambúrguer - Tela 6 do aplicativo.
 * Aberto ao clicar no ícone ☰ do cabeçalho.
 */
export default function MenuModal() {
  const router = useRouter();

  const menuSections = [
    { icon: "card", title: "Conta" },
    { icon: "card", title: "Cartão de crédito" },
    { icon: "loan", title: "Empréstimos" },
    { icon: "boxes", title: "Caixinhas" },
    { icon: "dollar", title: "Investimentos" },
    { icon: "sparkle", title: "Criptomoedas" },
    { icon: "shield", title: "Seguros" },
    { icon: "barcode", title: "Assistente de Pagamentos" },
    { icon: "refresh", title: "Open finance" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
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
          />
        </View>
      </View>

      {/* Lista de Itens do Menu */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {menuSections.map((item) => (
          <TouchableOpacity key={item.title} style={styles.menuRow} activeOpacity={0.7}>
            <View style={styles.menuRowLeft}>
              <NuIcon name={item.icon as any} size={20} color={theme.colors.textSecondary} />
              <Text style={styles.menuRowTitle}>{item.title}</Text>
            </View>
            <NuIcon name="chevron-right" size={18} color={theme.colors.textMuted} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Rodapé com Atalhos Rápidos */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIconBtn} activeOpacity={0.7}>
          <NuIcon name="settings" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIconBtn} activeOpacity={0.7}>
          <NuIcon name="user" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIconBtn} activeOpacity={0.7}>
          <NuIcon name="help" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.securityPill} activeOpacity={0.8}>
          <NuIcon name="shield" size={16} color="#FFFFFF" />
          <Text style={styles.securityPillText}>Segurança</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surface,
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
