module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  moduleNameMapper: {
    '^@lib(.*)$': '<rootDir>/src/lib$1',
    '^@logs(.*)$': '<rootDir>/src/logs$1',
    '^@config(.*)$': '<rootDir>/src/config$1',
    '^@schemes(.*)$': '<rootDir>/src/schemes$1',
    '^@services(.*)$': '<rootDir>/src/services$1',
    '^@handlers(.*)$': '<rootDir>/src/handlers$1',
    '^@repositories(.*)$': '<rootDir>/src/repositories$1',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  setupFiles: ['<rootDir>/src/tests/test-setup.ts'],
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  },
};
