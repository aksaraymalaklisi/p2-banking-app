import { StyleSheet, Text, TextInput, type TextInputProps, View } from "react-native";
import { theme } from "../../constants/theme";

export function FormField({
  label,
  ...inputProps
}: TextInputProps & { label: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...inputProps}
        placeholderTextColor={theme.colors.textMuted}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
    marginBottom: theme.spacing.xs,
  },
  input: {
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    fontSize: theme.typography.fontSizes.md,
  },
});
