import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { FeatureScreen } from "../components/common/FeatureScreen";
import { FormField } from "../components/common/FormField";
import { PrimaryButton } from "../components/common/PrimaryButton";
import { theme } from "../constants/theme";
import { useAuth } from "../context/AuthContext";

export default function PaymentsScreen() {
  const { createTransaction } = useAuth();
  const [barcode, setBarcode] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function payBill() {
    const numericAmount = Number(amount.replace(",", "."));
    if (!barcode.trim() || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      Alert.alert("Confira os dados", "Informe o código de barras e um valor válido.");
      return;
    }

    setLoading(true);
    try {
      await createTransaction(
        "PAYMENT",
        `Pagamento ${barcode.trim().slice(0, 20)}`,
        numericAmount
      );
      setBarcode("");
      setAmount("");
      Alert.alert("Pagamento realizado", "O pagamento foi registrado no seu extrato.");
    } catch (error) {
      Alert.alert(
        "Não foi possível pagar",
        error instanceof Error ? error.message : "Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <FeatureScreen
      title="Pagar"
      subtitle="Registre o pagamento de um boleto na sua conta de demonstração."
    >
      <FormField
        autoCapitalize="none"
        label="Código de barras"
        onChangeText={setBarcode}
        placeholder="Digite ou cole o código"
        value={barcode}
      />
      <FormField
        keyboardType="decimal-pad"
        label="Valor (R$)"
        onChangeText={setAmount}
        placeholder="0,00"
        value={amount}
      />
      <Text style={styles.note}>A operação precisa caber no saldo disponível.</Text>
      <PrimaryButton label="Confirmar pagamento" loading={loading} onPress={() => void payBill()} />
    </FeatureScreen>
  );
}

const styles = StyleSheet.create({
  note: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.xs,
    marginBottom: theme.spacing.md,
  },
});
