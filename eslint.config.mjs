
import eslintPluginVue from 'eslint-plugin-vue'


import globals from 'globals'

// export default ts.config(
//   js.configs.recommended,
//   ...ts.configs.recommended,
//   ...eslintPluginVue.configs['flat/recommended'],
//   {
//     files: ['*.vue', '**/*.vue'],
//     languageOptions: {
//       parserOptions: {
//         parser: '@typescript-eslint/parser'
//       }
//     } 
//   }
// )

export default [
  ...eslintPluginVue.configs['flat/recommended'],
  {
    ignores: ['node_modules, dist']
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
        
      }
    }
  },
  {
    files: ['**/*.{ts,vue}'],
    rules: {
      'prefer-const': 'error'
    }
  }
]