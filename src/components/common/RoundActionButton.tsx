import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../constants/theme";
import { NuIcon, IconName } from "./NuIcon";

export interface RoundActionButtonProps {
  icon: IconName;
  label: string;
  badgeText?: string;
  onPress?: () => void;
}

/**
 * Botão circular de ação rápida do Nubank (ex: Área Pix, Pagar, Recarga).
 * Utilizado dentro da lista deslizável horizontal da Home.
 */
export function RoundActionButton({
  icon,
  label,
  badgeText,
  onPress,
}: RoundActionButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.circle}>
        <NuIcon name={icon} size={22} color="#FFFFFF" />

        {/* Badge roxo flutuante (ex: "R$ 3.000") */}
        {badgeText ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.label} numberOfLines={2}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: 76,
    marginRight: theme.spacing.sm,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    bottom: -6,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  label: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: "600",
    textAlign: "center",
    marginTop: theme.spacing.sm,
    lineHeight: 14,
  },
});
