import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    // Unit tests only. The Playwright suite owns everything browser-facing and
    // has its own runner, so it is excluded here.
    include: ["common/**/*.test.ts", "features/**/*.test.ts"],
    exclude: ["e2e/**", "node_modules/**"],
  },
});
