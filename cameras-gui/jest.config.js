module.exports = {
  preset: 'jest-preset-angular',
  setupFiles: ['zone.js'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
};
