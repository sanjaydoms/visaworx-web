/**
 * Public entry point for the V2 Visa Intelligence Engine.
 *
 * Nothing here is wired into a route yet. Phase 2 establishes the knowledge
 * model only; V1 continues to serve every page until a capability flag is
 * turned on in a later phase.
 *
 * `config/flags` is intentionally NOT re-exported — it is server-only, and
 * re-exporting it here would drag that constraint into every consumer.
 */

export * from "./types/core";
export * from "./types/applicant";
export * from "./types/journey";
export * from "./sources/types";
export * from "./verification/types";
export * from "./versioning/history";
export * from "./countries/types";
export * from "./countries/registry";
export * from "./visa-categories/registry";
export * from "./family/types";
export * from "./documents/types";
export * from "./photo-specifications/types";
export * from "./biometrics/types";
