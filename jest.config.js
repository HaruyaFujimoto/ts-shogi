/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// // use ts-jest for strict test, but slow
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   testMatch: ["**/__tests__/**/*.spec.ts"],
// };

// use esbuild for fast test
module.exports = {
  testEnvironment: 'node',
  transform: {
    "^.+\\.tsx?$": "esbuild-jest"
  }
};
