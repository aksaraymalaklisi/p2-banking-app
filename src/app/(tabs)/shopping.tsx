import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../constants/theme";

/**
 * Tela de Vantagens (Shopping Nu) - Aba 3 do Nubank (Presente).
 * Apresenta descontos, cupons de parceiros e cashback.
 */
export default function ShoppingScreen() {
  // Ano em que o cliente se tornou cliente Nubank (dinâmico)
  const memberSinceYear = 2023;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Vantagens nu</Text>
          <Text style={styles.subtitle}>{`Roxinho desde ${memberSinceYear}`}</Text>
        </View>

        <View style={styles.searchBar}>
          <Text style={styles.searchText}>🔍  Buscar ofertas</Text>
        </View>

        <View style={styles.promoCard}>
          <Text style={styles.badge}>DESTAQUE</Text>
          <Text style={styles.promoTitle}>Economize com o Nubank</Text>
          <Text style={styles.promoSubtitle}>Até 40% OFF e cashback exclusivo</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top ofertas</Text>
          <View style={styles.offerCard}>
            <Text style={styles.offerMerchant}>Super Duolingo</Text>
            <Text style={styles.offerDesc}>3 meses grátis para clientes Nubank</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  header: {
    paddingVertical: theme.spacing.md,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: "700",
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
    marginTop: 2,
  },
  searchBar: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  searchText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
  },
  promoCard: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  badge: {
    color: theme.colors.primaryLight,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  promoTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: "700",
    marginTop: 4,
  },
  promoSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
    marginTop: 2,
  },
  section: {
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: "700",
    marginBottom: theme.spacing.sm,
  },
  offerCard: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
  offerMerchant: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: "600",
  },
  offerDesc: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
    marginTop: 4,
  },
});
