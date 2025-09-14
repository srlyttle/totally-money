// file: jest.config.js
 
// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // <= setup file here
  testEnvironment: "jest-environment-jsdom",
};
module.exports = createJestConfig(customJestConfig);
