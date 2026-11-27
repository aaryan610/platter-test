import { readFileSync } from 'node:fs';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { dts } from 'rollup-plugin-dts';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

// Order matters: the first extension that exists wins, so `import './StyledButton'`
// picks the platform file before falling back to a shared one.
const extensionsByPlatform = {
  web: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.js'],
  native: ['.native.tsx', '.native.ts', '.tsx', '.ts', '.js'],
};

// Dependencies and peers stay as imports in the output; the consuming app's bundler provides them.
const externalPackages = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];
const external = (id) => externalPackages.some((name) => id === name || id.startsWith(`${name}/`));

const getConfigs = (platform) => {
  const extensions = extensionsByPlatform[platform];

  return [
    {
      input: 'src/index.ts',
      external,
      output: {
        dir: `build/${platform}`,
        format: 'es',
        // One output file per source file, so consumers can tree-shake per component.
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true,
      },
      plugins: [
        nodeResolve({ extensions }),
        babel({
          extensions,
          babelHelpers: 'bundled',
          presets: ['@babel/preset-typescript', ['@babel/preset-react', { runtime: 'automatic' }]],
        }),
      ],
    },
    {
      input: 'src/index.ts',
      external,
      output: { file: `build/types/${platform}/index.d.ts`, format: 'es' },
      plugins: [dts({ tsconfig: `tsconfig.${platform}.json` })],
    },
  ];
};

// `rollup -c --environment PLATFORM:web` builds one platform; plain `rollup -c` builds both.
const platform = process.env.PLATFORM;
if (platform && !extensionsByPlatform[platform]) {
  throw new Error(`PLATFORM must be "web" or "native", received "${platform}"`);
}

export default platform ? getConfigs(platform) : [...getConfigs('web'), ...getConfigs('native')];
