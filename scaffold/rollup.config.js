import resolve from '@rollup/plugin-node-resolve'
import eslint from '@rollup/plugin-eslint'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/js/index.js',
  output: {
    file: 'dist/app.js',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    resolve(),
    postcss({
      extract: true
    }),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**']
    })
  ]
}
