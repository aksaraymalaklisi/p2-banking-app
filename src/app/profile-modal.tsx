import { Alert, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { theme } from "../constants/theme";
import { NuIcon } from "../components/common/NuIcon";
import { useAuth } from "../context/AuthContext";

/**
 * Modal de Perfil e Conta - Tela 5 do aplicativo.
 * Aberto ao clicar no avatar do cabeçalho.
 */
export default function ProfileModal() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const menuOptions = [
    {
      icon: "💼",
      title: "Abrir conta Nu Empresas",
      subtitle: "Crie uma conta PJ gratuita para o seu negócio",
      onPress: () => Alert.alert("Nu Empresas", "Este fluxo está disponível apenas como demonstração."),
    },
    {
      icon: "🏛️",
      title: "Open Finance",
      subtitle: "Compartilhe seus dados financeiros com segurança",
      onPress: () => Alert.alert("Open Finance", "Este fluxo está disponível apenas como demonstração."),
    },
    {
      icon: "🔄",
      title: "Trocar conta",
      subtitle: "Contas de outros países",
      onPress: () => Alert.alert("Trocar conta", "Não há outra conta vinculada a este perfil."),
    },
    {
      icon: "🚪",
      title: "Sair do aplicativo",
      subtitle: "Encerrar a sessão com segurança",
      onPress: async () => {
        try {
          await logout();
          router.replace("/(auth)/login");
        } catch (error) {
          Alert.alert(
            "Não foi possível sair",
            error instanceof Error ? error.message : "Tente novamente."
          );
        }
      },
    },
  ];

  return (
    <View style={styles.overlay}>
      <SafeAreaView style={styles.sheetContainer} edges={["bottom"]}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <NuIcon name="close" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.topBarRight}>
            <TouchableOpacity
              style={styles.iconBtn}
              activeOpacity={0.7}
              onPress={() => router.dismissTo("/account")}
            >
              <NuIcon name="settings" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBtn}
              activeOpacity={0.7}
              onPress={() => Alert.alert("Notificações", "Você não tem notificações novas.")}
            >
              <NuIcon name="bell" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Bloco do Usuário */}
        <View style={styles.userSection}>
          <View style={styles.avatarCircle}>
            <NuIcon name="user" size={32} color="#FFFFFF" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name ?? "Cliente"}</Text>
            <Text style={styles.accountData}>Agência 0001 • Conta 9876543-2</Text>
          </View>
        </View>

        {/* Opções de Configuração da Conta */}
        <Text style={styles.sectionHeader}>Outras contas e ações</Text>
        {menuOptions.map((item) => (
          <TouchableOpacity
            key={item.title}
            style={styles.optionRow}
            activeOpacity={0.7}
            onPress={item.onPress}
          >
            <View style={styles.optionIconContainer}>
              <Text style={styles.emoji}>{item.icon}</Text>
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>{item.title}</Text>
              <Text style={styles.optionSubtitle}>{item.subtitle}</Text>
            </View>
            <NuIcon name="chevron-right" size={18} color={theme.colors.textMuted} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.ratingButton}
          activeOpacity={0.7}
          onPress={() => Alert.alert("Avaliação", "Obrigado por testar esta tela!")}
        >
          <NuIcon name="heart" size={16} color={theme.colors.primaryLight} />
          <Text style={styles.ratingText}>Avalie esta tela</Text>
        </TouchableOpacity>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    flex: 1,
    marginTop: 56,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  topBarRight: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    padding: theme.spacing.md,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: "700",
  },
  accountData: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
    marginTop: 2,
  },
  sectionHeader: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: theme.spacing.md,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  emoji: {
    fontSize: 18,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: "600",
  },
  optionSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.xs,
    marginTop: 2,
  },
  ratingButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.xs,
    marginTop: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
  },
  ratingText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: "600",
  },
});
