import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../constants/theme";

/**
 * Tela de Investimentos - Aba 2 do Nubank (Cifrão).
 * Apresenta saldo de investimentos, rendimentos e atalhos para Caixinhas.
 */
export default function InvestmentsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Investimentos</Text>
          <TouchableOpacity style={styles.investButton} activeOpacity={0.8}>
            <Text style={styles.investButtonText}>Investir</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.label}>Total em investimentos</Text>
          <Text style={styles.balance}>R$ 3.250,00</Text>
          <Text style={styles.yieldText}>↗ + R$ 120,40 em 12 meses</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Minha organização</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Caixinhas</Text>
            <Text style={styles.cardSubtitle}>R$ 2.500,00 guardados</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: "700",
  },
  investButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  investButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: theme.typography.fontSizes.sm,
  },
  balanceCard: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
  },
  balance: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: "700",
    marginTop: theme.spacing.xs,
  },
  yieldText: {
    color: theme.colors.success,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: "600",
    marginTop: theme.spacing.xs,
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
  card: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
  cardTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: "600",
  },
  cardSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
    marginTop: 4,
  },
});
