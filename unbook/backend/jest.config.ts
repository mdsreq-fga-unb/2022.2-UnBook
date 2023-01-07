export default {
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/node_modules/",
    "!<rootDir>/src/main/**",
  ],
  silent: false,
  coverageDirectory: "coverage",
  roots: ["<rootDir>"],
  testEnvironment: "node",
  preset: "@shelf/jest-mongodb",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
