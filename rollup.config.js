import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import { camelCase } from '@zodash/camel-case';

import pkg from './package.json';

const umdName = pkg.name.indexOf('@') === -1 ? camelCase(pkg.name) : camelCase(pkg.name.split('/')[1]);

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
    // {
    //   file: pkg.browser,
    //   format: 'iife',
    //   // the global which can be used in a browser
    //   name: iifeName, // 'wordsParser'
    // }
    {
      file: pkg.browser,
      format: 'umd',
      name: umdName,
    },
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