# Platter

A minimal Blade-style design system monorepo: one token package, one component package that builds
separately for web and React Native, and one app per platform.

```
packages/
  tokens/        @platter/tokens      global values + semantic theme, one platform-agnostic build
  components/    @platter/components  Button, built twice: build/web and build/native
apps/
  web/           @platter/web         Vite + React DOM
  mobile/        @platter/mobile      Expo (SDK 58) + React Native
```

## Commands (from the repo root)

Uses pnpm workspaces (`pnpm-workspace.yaml`); internal packages depend on each other with
`workspace:*`.

| Command           | What it does                                                          |
| ----------------- | --------------------------------------------------------------------- |
| `pnpm install`    | Installs every workspace and links `@platter/*` packages              |
| `pnpm build`      | Builds tokens, then components (web + native + platform leak check)   |
| `pnpm typecheck`  | Typechecks every workspace; components is checked once per platform   |
| `pnpm dev:web`    | Starts the Vite dev server                                            |
| `pnpm dev:mobile` | Starts Expo; press `i` / `a` for a simulator or scan with Expo Go     |
| `pnpm verify`     | Build, typecheck, production web build, and a Metro bundle of mobile  |

`pnpm -r` and `pnpm --filter` run workspaces in dependency order, so tokens always builds before
components without listing the order anywhere.

The apps use the **built** packages, so run `pnpm build` first. While changing a package, keep
`pnpm --filter @platter/components dev` (Rollup watch) running in another terminal.

## How a component reaches each platform

1. `src/Button/Button.tsx` is shared and imports `./StyledButton` with no suffix.
2. `rollup.config.mjs` runs once per platform with a different extension order for
   `@rollup/plugin-node-resolve`: web tries `.web.tsx` first, native tries `.native.tsx` first.
   The output in `build/web/Button/Button.js` imports `./StyledButton.web.js`; the native one
   imports `./StyledButton.native.js`.
3. `rollup-plugin-dts` writes one declaration file per platform, using `tsconfig.web.json` or
   `tsconfig.native.json` (`moduleSuffixes` makes TypeScript resolve the same way).
4. `package.json` `exports` sends the `react-native` condition (set by Metro) to `build/native`;
   every other bundler (Vite) gets `build/web`.
5. `scripts/check-build.mjs` fails the build if a `.native` file or a `react-native` import ends
   up in the web output, or a `.web` file in the native output.

`react`, `react-native` and `@platter/tokens` are external: they stay as imports in the output and
the app's bundler supplies them. All workspaces pin the same React version (the one Expo SDK 58
requires), so pnpm's store holds one copy of React and every workspace links to it.

## Adding a component

1. Add `src/<Name>/` with shared logic, plus `.web.tsx` / `.native.tsx` files only for the parts
   that render differently.
2. Export it from `src/index.ts`.
3. `pnpm build && pnpm typecheck`.
