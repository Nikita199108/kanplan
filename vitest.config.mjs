import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        environment: "happy-dom",
        exclude: [
            "**/e2e/**",
            "**/e2e-backup/**", 
            "**/node_modules/**",
            "**/*.spec.ts" 
        ],
        include: ["**/*.test.ts", "**/*.test.tsx"] 
    },
});