export default {
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!<rootDir>/node_modules/"],
  silent: false,
  coverageDirectory: "coverage",
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  preset: "@shelf/jest-mongodb",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
