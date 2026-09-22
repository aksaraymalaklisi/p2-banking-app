import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "../../constants/theme";
import { NuIcon } from "./NuIcon";
import { useAccount } from "../../context/AccountContext";

export interface NuHeaderProps {
  title?: string;
  subtitle?: string;
  showEye?: boolean;
  showHelp?: boolean;
  showMenu?: boolean;
  showAvatar?: boolean;
  children?: ReactNode;
}

/**
 * Cabeçalho roxo característico do Nubank.
 * Conecta avatar ao ProfileModal, olho ao AccountContext e menu ao MenuModal.
 */
export function NuHeader({
  title,
  subtitle,
  showEye = true,
  showHelp = true,
  showMenu = true,
  showAvatar = true,
  children,
}: NuHeaderProps) {
  const router = useRouter();
  const { isBalanceVisible, toggleBalanceVisibility, userName } = useAccount();

  const displayTitle = title ?? `Olá, ${userName}`;

  return (
    <View style={styles.header}>
      {/* Linha Superior com Avatar e Ações */}
      <View style={styles.topRow}>
        {showAvatar ? (
          <TouchableOpacity
            style={styles.avatarButton}
            activeOpacity={0.8}
            onPress={() => router.push("/profile-modal")}
          >
            <NuIcon name="user" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 44 }} />
        )}

        <View style={styles.actionButtons}>
          {showEye && (
            <TouchableOpacity
              style={styles.iconButton}
              activeOpacity={0.7}
              onPress={toggleBalanceVisibility}
            >
              <NuIcon
                name={isBalanceVisible ? "eye" : "eye-off"}
                size={22}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          )}

          {showHelp && (
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <NuIcon name="help" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          )}

          {showMenu && (
            <TouchableOpacity
              style={styles.iconButton}
              activeOpacity={0.7}
              onPress={() => router.push("/menu-modal")}
            >
              <NuIcon name="menu" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Saudação / Título */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{displayTitle}</Text>
        {subtitle ? <Text style={styles.subtitleText}>{subtitle}</Text> : null}
      </View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.primary,
    paddingTop: 48,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatarButton: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.full,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    marginTop: theme.spacing.lg,
  },
  titleText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: "700",
  },
  subtitleText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: theme.typography.fontSizes.sm,
    marginTop: 2,
  },
});
