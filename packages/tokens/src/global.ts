// Global tokens: raw values with no meaning attached. Components should not use these directly;
// they go through the semantic names in theme.ts.
// Sizes are unitless numbers: React Native reads them as dp, React's inline styles read them as px.

export const colors = {
  white: '#FFFFFF',
  gray: {
    100: '#F1F3F5',
    300: '#CED4DA',
    500: '#868E96',
    900: '#212529',
  },
  blue: {
    100: '#E7F0FF',
    500: '#2F6FED',
    600: '#1F5BD1',
  },
} as const;

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 24,
} as const;

export const typography = {
  fontSize: {
    100: 14,
    200: 16,
  },
  fontWeight: {
    regular: 400,
    semibold: 600,
  },
} as const;

export const border = {
  radius: {
    small: 4,
    medium: 8,
  },
  width: {
    thin: 1,
  },
} as const;
