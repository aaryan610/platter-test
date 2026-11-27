import { border, colors, spacing, typography } from './global';

// Theme tokens: semantic names mapped onto global values. Rebranding means changing this mapping,
// not the components.
export const theme = {
  colors: {
    surface: {
      background: colors.gray[100],
      text: colors.gray[900],
    },
    action: {
      primary: {
        background: colors.blue[500],
        border: colors.blue[500],
        text: colors.white,
      },
      secondary: {
        background: colors.white,
        border: colors.blue[500],
        text: colors.blue[500],
      },
    },
  },
  spacing,
  typography,
  border,
} as const;

export type Theme = typeof theme;
