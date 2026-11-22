import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../constants/theme";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!", headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.title}>Tela não encontrada</Text>
        <Text style={styles.subtitle}>
          A página que você procura não existe ou não está disponível.
        </Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Voltar para o início</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: "700",
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
    marginTop: theme.spacing.sm,
    textAlign: "center",
  },
  link: {
    marginTop: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  linkText: {
    color: theme.colors.primaryLight,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: "700",
  },
});
