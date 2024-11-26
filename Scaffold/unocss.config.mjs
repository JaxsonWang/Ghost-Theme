import { defineConfig, presetAttributify, presetUno } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [presetUno(), presetAttributify({})],
  rules: [],
  shortcuts: {},
  transformers: [transformerDirectives()]
})
