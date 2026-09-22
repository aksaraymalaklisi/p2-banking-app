/**
 * Constantes de tema e estilo do aplicativo Nubank.
 * Todas as cores e espaçamentos seguem o design system oficial (Dark Mode).
 */
export const theme = {
  colors: {
    // Roxo icônico da marca Nubank
    primary: "#820AD1",
    primaryDark: "#5A0694",
    primaryLight: "#9A3BEE",
    primaryMuted: "rgba(130, 10, 209, 0.15)",

    // Fundo e superfícies (Dark Mode)
    background: "#000000",
    surface: "#121212",
    surfaceElevated: "#1E1E1E",
    surfaceHighlight: "#2A2A2A",
    border: "#2C2C2C",

    // Cores de texto
    textPrimary: "#FFFFFF",
    textSecondary: "#A0A0A0",
    textMuted: "#666666",

    // Indicadores e feedbacks visuais
    success: "#00D66F", // Verde de rendimento / investimentos
    warning: "#F59E0B",
    danger: "#EF4444",

    // Destaques e badges
    badgePurple: "#9A3BEE",
    badgeBackground: "#331454",
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  borderRadius: {
    sm: 6,
    md: 12,
    lg: 16,
    full: 9999,
  },

  typography: {
    fontSizes: {
      xs: 11,
      sm: 13,
      md: 15,
      lg: 18,
      xl: 22,
      xxl: 26,
    },
  },
} as const;

export type Theme = typeof theme;
