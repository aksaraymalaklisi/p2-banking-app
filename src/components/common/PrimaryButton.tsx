import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "../../constants/theme";

export function PrimaryButton({
  label,
  onPress,
  loading = false,
  disabled = false,
}: {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.8}
      disabled={disabled || loading}
      onPress={onPress}
      style={[styles.button, (disabled || loading) && styles.disabled]}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.sm,
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    color: "#FFFFFF",
    fontSize: theme.typography.fontSizes.md,
    fontWeight: "700",
  },
});
