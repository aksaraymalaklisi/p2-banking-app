import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../constants/theme";
import { NuHeader } from "../../components/common/NuHeader";
import { useAccount } from "../../context/AccountContext";

/**
 * Tela de Investimentos - Aba 2 do Nubank (Cifrão).
 * Apresenta saldo de investimentos com toggle de privacidade e atalhos para Caixinhas.
 */
export default function InvestmentsScreen() {
  const { investmentsTotal, formatCurrency } = useAccount();

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      {/* Cabeçalho Roxo Integrado */}
      <NuHeader title="Investimentos" subtitle="Acompanhe o rendimento do seu dinheiro" />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.actionHeader}>
          <TouchableOpacity style={styles.investButton} activeOpacity={0.8}>
            <Text style={styles.investButtonText}>Investir</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.label}>Total em investimentos</Text>
          <Text style={styles.balance}>{formatCurrency(investmentsTotal)}</Text>
          <Text style={styles.yieldText}>↗ + R$ 120,40 em 12 meses</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Minha organização</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Caixinhas</Text>
            <Text style={styles.cardSubtitle}>{`${formatCurrency(2500)} guardados`}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    padding: theme.spacing.md,
  },
  actionHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: theme.spacing.sm,
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
    marginTop: theme.spacing.xs,
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
