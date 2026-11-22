import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View } from "react-native";
import { FeatureScreen } from "../components/common/FeatureScreen";
import { theme } from "../constants/theme";
import { useAccount } from "../context/AccountContext";
import { useAuth } from "../context/AuthContext";
import { apiRequest, type Transaction } from "../lib/api";

export default function ActivityScreen() {
  const { token } = useAuth();
  const { formatCurrency } = useAccount();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadTransactions() {
      if (!token && Platform.OS !== "web") {
        setErrorMessage("Entre novamente para consultar seu extrato.");
        setLoading(false);
        return;
      }

      try {
        const result = await apiRequest<Transaction[]>("/transactions", {
          token: token ?? undefined,
        });
        if (active) {
          setTransactions(result);
        }
      } catch (error) {
        if (active) {
          setErrorMessage(
            error instanceof Error ? error.message : "Não foi possível carregar o extrato."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadTransactions();
    return () => {
      active = false;
    };
  }, [token]);

  return (
    <FeatureScreen title="Extrato" subtitle="Movimentações recentes da sua conta">
      {loading ? <ActivityIndicator color={theme.colors.primaryLight} /> : null}
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {!loading && !errorMessage && transactions.length === 0 ? (
        <Text style={styles.empty}>Suas movimentações aparecerão aqui.</Text>
      ) : null}
      {transactions.map((transaction) => (
        <View key={transaction.id} style={styles.row}>
          <View style={styles.description}>
            <Text style={styles.title}>{transaction.description}</Text>
            <Text style={styles.date}>
              {new Date(transaction.createdAt).toLocaleDateString("pt-BR")}
            </Text>
          </View>
          <Text style={styles.amount}>
            − {formatCurrency(transaction.amountCents / 100)}
          </Text>
        </View>
      ))}
    </FeatureScreen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  description: {
    flex: 1,
    paddingRight: theme.spacing.sm,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: "600",
  },
  date: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.xs,
    marginTop: theme.spacing.xs,
  },
  amount: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: "600",
  },
  error: {
    color: theme.colors.danger,
    fontSize: theme.typography.fontSizes.sm,
  },
  empty: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
  },
});
