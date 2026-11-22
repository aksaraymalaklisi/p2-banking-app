import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { FeatureScreen } from "../components/common/FeatureScreen";
import { FormField } from "../components/common/FormField";
import { PrimaryButton } from "../components/common/PrimaryButton";
import { theme } from "../constants/theme";
import { useAuth } from "../context/AuthContext";

export default function PixScreen() {
  const { createTransaction } = useAuth();
  const [key, setKey] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendPix() {
    const numericAmount = Number(amount.trim().replace(/\./g, "").replace(",", "."));
    if (!key.trim() || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      Alert.alert("Confira os dados", "Informe uma chave Pix e um valor válido.");
      return;
    }

    setLoading(true);
    try {
      await createTransaction("PIX", `Pix para ${key.trim()}`, numericAmount);
      setKey("");
      setAmount("");
      Alert.alert("Pix realizado", "A transferência foi registrada no seu extrato.");
    } catch (error) {
      Alert.alert(
        "Não foi possível transferir",
        error instanceof Error ? error.message : "Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <FeatureScreen
      title="Área Pix"
      subtitle="Envie um Pix de demonstração usando o saldo da sua conta."
    >
      <FormField
        autoCapitalize="none"
        label="Chave Pix do destinatário"
        onChangeText={setKey}
        placeholder="E-mail, telefone ou chave"
        value={key}
      />
      <FormField
        keyboardType="decimal-pad"
        label="Valor (R$)"
        onChangeText={setAmount}
        placeholder="0,00"
        value={amount}
      />
      <Text style={styles.note}>O valor será debitado do saldo de demonstração.</Text>
      <PrimaryButton label="Transferir" loading={loading} onPress={() => void sendPix()} />
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
