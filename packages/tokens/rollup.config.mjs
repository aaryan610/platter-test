import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { dts } from 'rollup-plugin-dts';

const extensions = ['.ts', '.js'];

// Tokens are plain values with no platform-specific code, so one build serves web and native.
export default [
  {
    input: 'src/index.ts',
    output: {
      dir: 'build',
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
    },
    plugins: [
      nodeResolve({ extensions }),
      babel({ extensions, babelHelpers: 'bundled', presets: ['@babel/preset-typescript'] }),
    ],
  },
  {
    input: 'src/index.ts',
    output: { file: 'build/index.d.ts', format: 'es' },
    plugins: [dts({ tsconfig: 'tsconfig.json' })],
  },
];
