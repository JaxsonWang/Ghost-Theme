import resolve from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'

const production = process.env.NODE_ENV === 'production'

module.exports = {
  input: 'src/js/index.js',
  output: {
    file: production ? 'dist/app.js' : 'src/app.js',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    resolve(),
    postcss({
      extract: true
    }),
    babel({ babelHelpers: 'bundled' }),
    production && terser()
  ],
  watch: {
    exclude: ['node_modules/**']
  }
}
