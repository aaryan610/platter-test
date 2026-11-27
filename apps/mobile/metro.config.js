// Expo's default config already handles pnpm workspaces (it watches the monorepo root) and
// resolves package `exports` with the "react-native" condition, which is how this app gets
// @platter/components' native build. Kept as a file so there is one place to customise Metro.
const { getDefaultConfig } = require('expo/metro-config');

module.exports = getDefaultConfig(__dirname);
