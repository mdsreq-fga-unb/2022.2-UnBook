/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		setupFiles: ["vitest-localstorage-mock"],
		environment: "jsdom",
		coverage: {
			provider: "istanbul",
			exclude: ["**/node_modules/**", "**/dist/**", "<rootDir>/src/tests/"],
		},
	},
});
