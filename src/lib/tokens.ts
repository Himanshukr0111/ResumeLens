/**
 * ResumeLens Design System Tokens
 * Defined according to the Linear / Stripe / Apple-inspired design language.
 */

export const tokens = {
  colors: {
    // Canvas & Typography
    background: "#FAFAF8", // Warm off-white
    foreground: "#171717", // Near-black typography
    foregroundMuted: "#737373", // Muted gray secondary text
    foregroundSubtle: "#A3A39E", // Subtle tertiary / disabled text

    // Surfaces
    surface: "#FFFFFF",
    surfaceSubtle: "#F5F5F2",
    surfaceHover: "#F0EFFF",

    // Borders
    border: "#EAEAE6", // Crisp, thin border
    borderSubtle: "#F2F2EE",
    borderFocus: "#7666E8",

    // Soft Indigo Brand Accent
    brand: {
      50: "#F6F5FE",
      100: "#ECE9FD",
      200: "#DDD7FC",
      300: "#BFB3F8",
      400: "#9885F3",
      500: "#7666E8", // Primary accent
      600: "#6350DC", // Active / hover accent
      700: "#503EC5",
      800: "#4132A3",
      900: "#362B83",
    },

    // Success State
    success: {
      50: "#F0FDF4",
      100: "#DCFCE7",
      500: "#16A34A",
      600: "#15803D",
      border: "#BBF7D0",
    },

    // Warning State
    warning: {
      50: "#FFFBEB",
      100: "#FEF3C7",
      500: "#D97706",
      border: "#FDE68A",
    },

    // Destructive State
    destructive: {
      50: "#FEF2F2",
      100: "#FEE2E2",
      500: "#DC2626",
      600: "#B91C1C",
      border: "#FECACA",
    },
  },

  typography: {
    fontFamilies: {
      sans: "var(--font-sans), Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      mono: "var(--font-mono), 'JetBrains Mono', Menlo, monospace",
    },
    sizes: {
      xs: { fontSize: "0.75rem", lineHeight: "1rem", letterSpacing: "0.01em" },
      sm: { fontSize: "0.875rem", lineHeight: "1.25rem", letterSpacing: "0.005em" },
      base: { fontSize: "1rem", lineHeight: "1.5rem", letterSpacing: "-0.011em" },
      lg: { fontSize: "1.125rem", lineHeight: "1.75rem", letterSpacing: "-0.014em" },
      xl: { fontSize: "1.25rem", lineHeight: "1.75rem", letterSpacing: "-0.017em" },
      "2xl": { fontSize: "1.5rem", lineHeight: "2rem", letterSpacing: "-0.021em" },
      "3xl": { fontSize: "1.875rem", lineHeight: "2.25rem", letterSpacing: "-0.024em" },
      "4xl": { fontSize: "2.25rem", lineHeight: "2.5rem", letterSpacing: "-0.027em" },
      display: { fontSize: "3rem", lineHeight: "1.15", letterSpacing: "-0.035em" },
    },
    weights: {
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },

  radii: {
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },

  shadows: {
    subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.04)",
    card: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02)",
    cardHover: "0 8px 24px -4px rgba(0, 0, 0, 0.06), 0 2px 6px -2px rgba(0, 0, 0, 0.03)",
    dropdown: "0 10px 30px -4px rgba(0, 0, 0, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.04)",
    dialog: "0 24px 54px -12px rgba(0, 0, 0, 0.14), 0 8px 20px -4px rgba(0, 0, 0, 0.06)",
    brand: "0 2px 10px 0 rgba(118, 102, 232, 0.28)",
  },

  transitions: {
    default: "150ms cubic-bezier(0.16, 1, 0.3, 1)",
    smooth: "250ms cubic-bezier(0.16, 1, 0.3, 1)",
  },
} as const;

export type DesignTokens = typeof tokens;
