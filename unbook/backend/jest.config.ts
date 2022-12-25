export default {
  collectCoverageFrom: ["<rootDir>src/**/*.ts"],
  coverageDirectory: "coverage",
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
