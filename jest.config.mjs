export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
};
