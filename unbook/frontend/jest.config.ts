export default {
	collectCoverageFrom: [
		"src/**/*.{js,jsx,ts,tsx}",
		"!<rootDir>/node_modules/",
		"!<rootDir>/src/main/**",
	],
	silent: false,
	transformIgnorePatterns: [],

	coverageDirectory: "coverage",
	roots: ["<rootDir>/src"],
	testEnvironment: "jsdom",
	preset: "@shelf/jest-mongodb",
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
};
