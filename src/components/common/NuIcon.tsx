import React from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * Nomes de ícones suportados pelo sistema de design Nubank.
 */
export type IconName =
  | "arrows" // Aba 1: Setas / Principal (⇅)
  | "dollar" // Aba 2: Cifrão / Investimentos ($)
  | "gift" // Aba 3: Presente / Vantagens (🎁)
  | "phone" // Aba 4: Celular / NuCel (📱)
  | "eye" // Cabeçalho: Mostrar saldo (👁)
  | "eye-off" // Cabeçalho: Ocultar saldo (👁‍🗨)
  | "help" // Cabeçalho: Ajuda (?)
  | "menu" // Cabeçalho: Menu hambúrguer (☰)
  | "user" // Cabeçalho / Modal: Foto de perfil (👤)
  | "close" // Modal: Fechar (✕)
  | "chevron-right" // Navegação: Seta para frente (›)
  | "pix" // Ação rápida: Pix (❖)
  | "barcode" // Ação rápida: Pagar boleto (|||)
  | "loan" // Ação rápida: Pegar emprestado (💰)
  | "boxes" // Ação rápida: Caixinhas (📦)
  | "card" // Meus cartões (💳)
  | "search" // Campo de busca (🔍)
  | "shield" // Central de segurança (🛡)
  | "bell" // Notificações (🔔)
  | "settings" // Configurações / Porca (⚙)
  | "heart" // Avalie esta tela (♥)
  | "crypto" // Criptomoedas (₿)
  | "finance"; // Open Finance (🏛)

/**
 * Interface de Props do componente NuIcon.
 */
export interface NuIconProps {
  name: IconName;
  size?: number;
  color?: string;
}

/**
 * Componente de ícone autônomo e sem dependências externas.
 */
export function NuIcon({ name, size = 20, color = "#FFFFFF" }: NuIconProps) {
  const getGlyph = (): string => {
    switch (name) {
      case "arrows":
        return "⇅";
      case "dollar":
        return "$";
      case "gift":
        return "🎁";
      case "phone":
        return "📱";
      case "eye":
        return "👁";
      case "eye-off":
        return "👁‍🗨";
      case "help":
        return "?";
      case "menu":
        return "☰";
      case "user":
        return "👤";
      case "close":
        return "✕";
      case "chevron-right":
        return "›";
      case "pix":
        return "❖";
      case "barcode":
        return "|||";
      case "loan":
        return "💰";
      case "boxes":
        return "📦";
      case "card":
        return "💳";
      case "search":
        return "🔍";
      case "shield":
        return "🛡";
      case "bell":
        return "🔔";
      case "settings":
        return "⚙";
      case "heart":
        return "♥";
      case "crypto":
        return "₿";
      case "finance":
        return "🏛";
      default:
        return "•";
    }
  };

  const isTextSymbol = ["$", "?", "☰", "✕", "›", "|||", "⇅", "❖", "•"].includes(
    getGlyph()
  );

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Text
        style={[
          styles.text,
          {
            fontSize: isTextSymbol ? size * 0.9 : size * 0.8,
            color: color,
            lineHeight: size,
          },
        ]}
      >
        {getGlyph()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontWeight: "700",
  },
});
