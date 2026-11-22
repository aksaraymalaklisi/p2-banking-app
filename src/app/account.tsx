import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { FeatureScreen } from "../components/common/FeatureScreen";
import { PrimaryButton } from "../components/common/PrimaryButton";
import { theme } from "../constants/theme";
import { useAccount } from "../context/AccountContext";
import { useAuth } from "../context/AuthContext";

export default function AccountScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { agency, accountNumber, formatCurrency, balance } = useAccount();

  function signOut() {
    logout();
    router.replace("/(auth)/login");
  }

  return (
    <FeatureScreen title="Minha conta" subtitle="Seus dados e acesso à conta">
      <View style={styles.card}>
        <Text style={styles.name}>{user?.name ?? "Cliente"}</Text>
        <Text style={styles.detail}>{user?.email}</Text>
        <Text style={styles.detail}>Agência {agency} • Conta {accountNumber}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Saldo disponível</Text>
        <Text style={styles.balance}>{formatCurrency(balance)}</Text>
      </View>
      <PrimaryButton label="Sair da conta" onPress={signOut} />
    </FeatureScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  name: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: "700",
  },
  detail: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
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
});
