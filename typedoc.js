const pkg = require('./package.json')

module.exports = {
  // categorizeByGroup: false,
  categoryOrder: ['Data Type', 'Constructor', 'Namespace', 'Typeclass Instance', '*'],
  defaultCategory: 'Other',
  disableSources: true,
  exclude: '**/*Internal.ts',
  excludeExternals: true,
  excludeNotExported: true,
  excludePrivate: true,
  excludeProtected: true,
  hideGenerator: true,
  ignoreCompilerErrors: true,
  includeDeclarations: true,
  listInvalidSymbolLinks: true,
  mode: 'modules',
  name: pkg.name,
  out: './docs',
  plugins: ['typedoc-plugin-markdown'],
  stripInternal: true,
  theme: 'docusaurus',
  tsconfig: 'tsconfig.typedoc.json',
}
