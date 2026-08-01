import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    // Unit tests only. The Playwright suite owns everything browser-facing and
    // has its own runner, so it is excluded here.
    include: ["common/**/*.test.ts", "features/**/*.test.ts"],
    exclude: [
      "e2e/**",
      "node_modules/**",

      // Legacy script-style checks from the V1 build. These are not test
      // suites - they are top-level scripts using console.log and node:assert,
      // and they had never been executed because the project had no runner
      // until now. Excluded rather than deleted so their intent survives, but
      // they need converting to real tests.
      //
      // Note for whoever converts them: consultation.test.ts asserts
      // "Submission adapter must succeed with default dev fallback", which is
      // the silent lead-loss behaviour fixed in 3168a57. It encodes the bug as
      // expected behaviour and must be rewritten, not restored.
      "features/consultation/consultation.test.ts",
      "features/readiness/engine/readiness-evaluator.test.ts",
      "features/assistant/assistant.test.ts",
      "features/resources/resources.test.ts",
      "features/services/services.test.ts",
      "features/launch/launch.test.ts",
      "common/services/klar-crm/klar-crm.test.ts",
    ],
  },
});
