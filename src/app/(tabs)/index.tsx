import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../constants/theme";
import { NuHeader } from "../../components/common/NuHeader";
import { RoundActionButton } from "../../components/common/RoundActionButton";
import { NuIcon } from "../../components/common/NuIcon";
import { useAccount } from "../../context/AccountContext";

/**
 * Tela Principal (Home) - Aba 1 do Nubank.
 * Conecta o cabeçalho roxo, a visibilidade de saldo e os cartões de produtos.
 */
export default function HomeScreen() {
  const { balance, creditUsed, creditLimit, formatCurrency } = useAccount();

  const quickActions = [
    { icon: "pix" as const, label: "Área Pix e Transferir" },
    { icon: "barcode" as const, label: "Pagar" },
    { icon: "phone" as const, label: "Recarga de celular" },
    { icon: "loan" as const, label: "Pegar emprestado", badge: "R$ 3.000" },
    { icon: "boxes" as const, label: "Caixinhas Investir" },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      {/* Cabeçalho Roxo Oficial */}
      <NuHeader />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Bloco de Saldo em Conta */}
        <TouchableOpacity style={styles.accountSection} activeOpacity={0.7}>
          <View style={styles.accountHeader}>
            <Text style={styles.accountTitle}>Conta</Text>
            <NuIcon name="chevron-right" size={18} color={theme.colors.textSecondary} />
          </View>
          <Text style={styles.balanceValue}>{formatCurrency(balance)}</Text>
        </TouchableOpacity>

        {/* Lista Horizontal Deslizável de Ações Rápidas */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.actionsContainer}
        >
          {quickActions.map((action) => (
            <RoundActionButton
              key={action.label}
              icon={action.icon}
              label={action.label}
              badgeText={action.badge}
            />
          ))}
        </ScrollView>

        {/* Atalho Meus Cartões */}
        <TouchableOpacity style={styles.myCardsBtn} activeOpacity={0.7}>
          <NuIcon name="card" size={20} color="#FFFFFF" />
          <Text style={styles.myCardsText}>Meus cartões</Text>
        </TouchableOpacity>

        {/* Card de Cartão de Crédito */}
        <TouchableOpacity style={styles.productCard} activeOpacity={0.7}>
          <View style={styles.cardHeader}>
            <Text style={styles.productTitle}>Cartão de crédito</Text>
            <NuIcon name="chevron-right" size={18} color={theme.colors.textSecondary} />
          </View>
          <Text style={styles.cardSubtitle}>Fatura atual</Text>
          <Text style={styles.invoiceValue}>{formatCurrency(creditUsed)}</Text>
          <Text style={styles.limitInfo}>
            Limite disponível de {formatCurrency(creditLimit - creditUsed)}
          </Text>
        </TouchableOpacity>

        {/* Card de Empréstimo */}
        <TouchableOpacity style={styles.productCard} activeOpacity={0.7}>
          <View style={styles.cardHeader}>
            <Text style={styles.productTitle}>Empréstimo</Text>
            <NuIcon name="chevron-right" size={18} color={theme.colors.textSecondary} />
          </View>
          <Text style={styles.cardSubtitle}>Valor disponível de até</Text>
          <Text style={styles.loanValue}>R$ 3.000,00</Text>
        </TouchableOpacity>

        {/* Rodapé: Avalie esta tela */}
        <TouchableOpacity style={styles.ratingButton} activeOpacity={0.7}>
          <NuIcon name="heart" size={16} color={theme.colors.primaryLight} />
          <Text style={styles.ratingText}>Avalie esta tela</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  accountSection: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  accountHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.xs,
  },
  accountTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: "600",
  },
  balanceValue: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: "700",
  },
  actionsContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
  },
  myCardsBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.md,
    marginHorizontal: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  myCardsText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: "600",
  },
  productCard: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: "700",
  },
  cardSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
    marginTop: theme.spacing.sm,
  },
  invoiceValue: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: "700",
    marginTop: 2,
  },
  limitInfo: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.xs,
    marginTop: 4,
  },
  loanValue: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: "700",
    marginTop: 2,
  },
  ratingButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.xl,
  },
  ratingText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: "600",
  },
});
