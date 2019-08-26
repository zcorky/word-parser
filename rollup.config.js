import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: 'src/index.ts', // our source file
  output: [
    // {
    //   file: pkg.main,
    //   format: 'cjs'
    // },
    // {
    //   file: pkg.module,
    //   format: 'es' // the preferred format
    // },
    {
      file: pkg.browser,
      format: 'iife',
      name: 'wordsParser' // the global which can be used in a browser
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {})
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    terser() // minifies generated bundles
  ]
};