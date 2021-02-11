module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['<rootDir>/jest/setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleNameMapper: {
    '.+\\.(png)$': 'jest-transform-stub',
    '\\.(svg)$': '<rootDir>/__mocks__/svgMock.js',
  },
};
