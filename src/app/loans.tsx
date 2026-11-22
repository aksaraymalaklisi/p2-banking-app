import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { FeatureScreen } from "../components/common/FeatureScreen";
import { FormField } from "../components/common/FormField";
import { PrimaryButton } from "../components/common/PrimaryButton";
import { theme } from "../constants/theme";

export default function LoansScreen() {
  const [amount, setAmount] = useState("");

  function requestSimulation() {
    const numericAmount = Number(amount.replace(",", "."));
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      Alert.alert("Valor inválido", "Informe quanto deseja simular.");
      return;
    }
    Alert.alert(
      "Simulação solicitada",
      `Sua simulação de R$ ${numericAmount.toFixed(2).replace(".", ",")} foi registrada.`
    );
    setAmount("");
  }

  return (
    <FeatureScreen title="Empréstimo" subtitle="Faça uma simulação sem contratar crédito real.">
      <Text style={styles.description}>
        Escolha um valor para visualizar a etapa inicial de uma solicitação de empréstimo.
      </Text>
      <FormField
        keyboardType="decimal-pad"
        label="Valor desejado (R$)"
        onChangeText={setAmount}
        placeholder="0,00"
        value={amount}
      />
      <PrimaryButton label="Simular empréstimo" onPress={requestSimulation} />
      <Text style={styles.disclaimer}>Esta simulação é apenas ilustrativa.</Text>
    </FeatureScreen>
  );
}

const styles = StyleSheet.create({
  description: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  disclaimer: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.xs,
    textAlign: "center",
    marginTop: theme.spacing.md,
  },
});
