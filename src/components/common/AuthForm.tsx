import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { theme } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";
import { FormField } from "./FormField";
import { PrimaryButton } from "./PrimaryButton";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const { login, register, restoreError, clearRestoreError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const isRegister = mode === "register";

  async function submit() {
    setErrorMessage("");
    clearRestoreError();
    if (isRegister && password !== confirmation) {
      setErrorMessage("As senhas não conferem.");
      return;
    }

    setLoading(true);
    try {
      if (isRegister) {
        await register(name.trim(), email.trim(), password);
      } else {
        await login(email.trim(), password);
      }
      router.replace("/(tabs)");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Não foi possível acessar sua conta."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.flex}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.brandMark}>
          <Text style={styles.brandLetter}>nu</Text>
        </View>
        <Text style={styles.title}>{isRegister ? "Crie sua conta" : "Olá, que bom ter você aqui"}</Text>
        <Text style={styles.subtitle}>
          {isRegister
            ? "Seus dados ficam salvos no banco da aplicação."
            : "Entre para acessar sua conta e seus serviços."}
        </Text>

        {isRegister ? (
          <FormField
            autoCapitalize="words"
            label="Nome completo"
            onChangeText={setName}
            placeholder="Seu nome"
            value={name}
          />
        ) : null}
        <FormField
          autoCapitalize="none"
          keyboardType="email-address"
          label="E-mail"
          onChangeText={setEmail}
          placeholder="voce@email.com"
          value={email}
        />
        <FormField
          autoCapitalize="none"
          label="Senha"
          onChangeText={setPassword}
          placeholder={isRegister ? "Mínimo de 8 caracteres" : "Sua senha"}
          secureTextEntry
          value={password}
        />
        {isRegister ? (
          <FormField
            autoCapitalize="none"
            label="Confirme sua senha"
            onChangeText={setConfirmation}
            placeholder="Digite a senha novamente"
            secureTextEntry
            value={confirmation}
          />
        ) : null}

        {errorMessage || restoreError ? (
          <Text style={styles.error}>{errorMessage || restoreError}</Text>
        ) : null}

        <PrimaryButton
          label={isRegister ? "Criar conta" : "Entrar"}
          loading={loading}
          onPress={() => void submit()}
        />

        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => router.replace(isRegister ? "/(auth)/login" : "/(auth)/register")}
          style={styles.switchAction}
        >
          <Text style={styles.switchText}>
            {isRegister ? "Já tem uma conta? " : "Ainda não tem conta? "}
            <Text style={styles.switchHighlight}>
              {isRegister ? "Entrar" : "Cadastre-se"}
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  brandMark: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.lg,
  },
  brandLetter: {
    color: "#FFFFFF",
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: "800",
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: "700",
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
    lineHeight: 20,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
  error: {
    color: theme.colors.danger,
    fontSize: theme.typography.fontSizes.sm,
    marginBottom: theme.spacing.sm,
  },
  switchAction: {
    paddingVertical: theme.spacing.lg,
    alignItems: "center",
  },
  switchText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
  },
  switchHighlight: {
    color: theme.colors.primaryLight,
    fontWeight: "700",
  },
});
