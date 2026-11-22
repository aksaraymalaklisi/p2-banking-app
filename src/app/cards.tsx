import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FeatureScreen } from "../components/common/FeatureScreen";
import { PrimaryButton } from "../components/common/PrimaryButton";
import { theme } from "../constants/theme";

export default function CardsScreen() {
  const [blocked, setBlocked] = useState(false);

  return (
    <FeatureScreen title="Meus cartões" subtitle="Gerencie seu cartão de crédito de demonstração.">
      <View style={styles.card}>
        <Text style={styles.cardBrand}>NU</Text>
        <Text style={styles.cardNumber}>••••  ••••  ••••  4821</Text>
        <Text style={styles.cardHolder}>CARTÃO VIRTUAL</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Status do cartão</Text>
        <Text style={styles.status}>{blocked ? "Bloqueado" : "Ativo"}</Text>
      </View>
      <PrimaryButton
        label={blocked ? "Desbloquear cartão" : "Bloquear cartão"}
        onPress={() => setBlocked((current) => !current)}
      />
    </FeatureScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 190,
    justifyContent: "space-between",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  cardBrand: {
    color: "#FFFFFF",
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: "800",
  },
  cardNumber: {
    color: "#FFFFFF",
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: "700",
  },
  cardHolder: {
    color: "#FFFFFF",
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: "700",
  },
  info: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
  },
  status: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: "700",
    marginTop: theme.spacing.xs,
  },
});
