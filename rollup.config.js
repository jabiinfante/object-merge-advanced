import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'
import { minify } from 'uglify-es'
import pkg from './package.json'

export default [
  // browser-friendly UMD build
  {
    input: 'src/main.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'mergeAdvanced',
    },
    plugins: [
      resolve(), // so Rollup can find deps
      commonjs(), // so Rollup can convert deps to ES modules
      babel(),
      uglify({}, minify),
    ],
  },

  // Builds: CommonJS (for Node) and ES module (for bundlers)
  {
    input: 'src/main.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    external: [
      'arrayiffy-if-string',
      'array-includes-all',
      'array-includes-with-glob',
      'check-types-mini',
      'lodash.clonedeep',
      'type-detect',
      'lodash.includes',
      'lodash.uniq',
      'util-nonempty',
    ],
    plugins: [
      babel(),
    ],
  },

  // util build in order to unit-test utilities separately:
  {
    input: 'src/util.js',
    output: [
      { file: 'dist/util.cjs.js', format: 'cjs' },
    ],
    external: [
      'array-includes-all',
      'type-detect',
    ],
    plugins: [
      babel(),
    ],
  },
]
