import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../constants/theme";

/**
 * Tela de Vantagens (Shopping Nu) - Aba 3 do Nubank (Presente).
 * Apresenta descontos, cupons de parceiros e cashback.
 */
export default function ShoppingScreen() {
  // Ano em que o cliente se tornou cliente Nubank (dinâmico)
  const memberSinceYear = 2023;
  const [query, setQuery] = useState("");
  const offers = [
    { merchant: "Super Duolingo", description: "3 meses grátis para clientes Nubank" },
    { merchant: "Streaming nu", description: "Descontos especiais para assinantes" },
  ];
  const filteredOffers = offers.filter((offer) =>
    `${offer.merchant} ${offer.description}`.toLocaleLowerCase("pt-BR").includes(
      query.trim().toLocaleLowerCase("pt-BR")
    )
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Vantagens nu</Text>
          <Text style={styles.subtitle}>{`Roxinho desde ${memberSinceYear}`}</Text>
        </View>

        <TextInput
          accessibilityLabel="Buscar ofertas"
          placeholder="🔍  Buscar ofertas"
          placeholderTextColor={theme.colors.textSecondary}
          value={query}
          onChangeText={setQuery}
          style={styles.searchBar}
        />

        <TouchableOpacity
          accessibilityRole="button"
          style={styles.promoCard}
          activeOpacity={0.8}
          onPress={() =>
            Alert.alert("Oferta em destaque", "As ofertas são demonstrativas nesta versão.")
          }
        >
          <Text style={styles.badge}>DESTAQUE</Text>
          <Text style={styles.promoTitle}>Economize com o Nubank</Text>
          <Text style={styles.promoSubtitle}>Até 40% OFF e cashback exclusivo</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top ofertas</Text>
          {filteredOffers.map((offer) => (
            <TouchableOpacity
              key={offer.merchant}
              accessibilityRole="button"
              style={styles.offerCard}
              activeOpacity={0.8}
              onPress={() =>
                Alert.alert(offer.merchant, "Esta oferta está disponível apenas para demonstração.")
              }
            >
              <Text style={styles.offerMerchant}>{offer.merchant}</Text>
              <Text style={styles.offerDesc}>{offer.description}</Text>
            </TouchableOpacity>
          ))}
          {filteredOffers.length === 0 ? (
            <Text style={styles.offerDesc}>Nenhuma oferta encontrada.</Text>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
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
    marginTop: 2,
  },
  searchBar: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginTop: theme.spacing.md,
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
  },
  promoCard: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  badge: {
    color: theme.colors.primaryLight,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  promoTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: "700",
    marginTop: 4,
  },
  promoSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
    marginTop: 2,
  },
  section: {
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: "700",
    marginBottom: theme.spacing.sm,
  },
  offerCard: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  offerMerchant: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: "600",
  },
  offerDesc: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
    marginTop: 4,
  },
});
