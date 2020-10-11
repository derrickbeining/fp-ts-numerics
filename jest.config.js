module.exports = {
  collectCoverageFrom: ['src/*.{js,ts}'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  // coverageThreshold: {
  //   global: {
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //     statements: 100,
  //   },
  // },
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: false,
      },
    },
  },
  moduleDirectories: ['.', 'node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  preset: 'ts-jest',
  setupFiles: ['./test/setup.ts'],
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
}
