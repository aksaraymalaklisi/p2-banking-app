import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../constants/theme";

/**
 * Tela NuCel - Aba 4 do Nubank (Celular).
 * Apresenta a operadora de telefonia do Nubank, planos e benefícios exclusivos.
 */
export default function NuCelScreen() {
  const benefits = [
    {
      icon: "📶",
      title: "Conexão 5G sem complicações",
      desc: "Traga seu número e ative em poucos minutos pelo app.",
    },
    {
      icon: "💬",
      title: "App do Nu e WhatsApp à vontade",
      desc: "Navegação e ligações de voz/vídeo sem descontar da franquia.",
    },
    {
      icon: "📈",
      title: "Caixinha Turbo exclusiva NuCel",
      desc: "Rendimento de até 120% do CDI para assinantes.",
    },
    {
      icon: "🔓",
      title: "Sem fidelidade nem multas",
      desc: "Liberdade total para pausar, alterar ou cancelar quando quiser.",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>NuCel</Text>
          <Text style={styles.subtitle}>
            O plano de celular com benefícios que só o Nubank pode oferecer
          </Text>
        </View>

        {/* Hero Card com R$ 45 e Botão Conhecer planos */}
        <View style={styles.heroCard}>
          <Text style={styles.heroPreText}>A partir de</Text>
          <Text style={styles.heroPrice}>R$ 45 /mês</Text>
          <TouchableOpacity style={styles.heroButton} activeOpacity={0.85}>
            <Text style={styles.heroButtonText}>Conhecer planos</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Benefícios */}
        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>Vantagens exclusivas</Text>
          {benefits.map((item) => (
            <View key={item.title} style={styles.benefitItem}>
              <View style={styles.iconCircle}>
                <Text style={styles.benefitIcon}>{item.icon}</Text>
              </View>
              <View style={styles.benefitTextContainer}>
                <Text style={styles.benefitTitle}>{item.title}</Text>
                <Text style={styles.benefitDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    padding: theme.spacing.md,
  },
  header: {
    paddingVertical: theme.spacing.md,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: "700",
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
    marginTop: 4,
    lineHeight: 20,
  },
  heroCard: {
    backgroundColor: theme.colors.primaryDark,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.md,
  },
  heroPreText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: "600",
  },
  heroPrice: {
    color: "#FFFFFF",
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: "800",
    marginTop: 2,
    marginBottom: theme.spacing.md,
  },
  heroButton: {
    backgroundColor: theme.colors.textPrimary,
    borderRadius: theme.borderRadius.full,
    paddingVertical: theme.spacing.sm,
    alignItems: "center",
  },
  heroButtonText: {
    color: theme.colors.background,
    fontWeight: "700",
    fontSize: theme.typography.fontSizes.sm,
  },
  benefitsSection: {
    marginTop: theme.spacing.xl,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: "700",
    marginBottom: theme.spacing.md,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surfaceHighlight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  benefitIcon: {
    fontSize: 18,
  },
  benefitTextContainer: {
    flex: 1,
  },
  benefitTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: "700",
  },
  benefitDesc: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.xs,
    marginTop: 2,
    lineHeight: 16,
  },
});
