module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '<rootDir>/tests/components/'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  testEnvironment: 'jsdom',
}