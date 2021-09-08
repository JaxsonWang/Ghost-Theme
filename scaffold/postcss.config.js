const production = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    require('postcss-import')({
      path: 'src/css'
    }),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
    production && require('cssnano')({ preset: 'default' })
  ]
}
