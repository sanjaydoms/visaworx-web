import "server-only";

/**
 * Centralised V2 feature flags.
 *
 * Server-only by construction: this module imports `server-only`, so any
 * attempt to pull it into a client component fails the build rather than
 * leaking migration configuration into the browser bundle. Client components
 * that need to vary behaviour receive a resolved boolean as a prop from a
 * server component.
 *
 * Every flag defaults to OFF, which means production keeps serving V1 until
 * someone explicitly turns a capability on. Rollback is therefore removing an
 * environment variable, with no code change and no redeploy of application
 * logic.
 */
export const V2_FLAGS = [
  "VISA_INTELLIGENCE_V2",
  "VISA_CLARITY_ENGINE_V2",
  "GLOBAL_VISA_DATA_V2",
  "PHOTO_SPEC_ENGINE_V2",
  "FAMILY_MINOR_LOGIC_V2",
  "AI_VISA_COACH_V2",
  "SEARCH_INTELLIGENCE_V2",
  "CONSULTANT_HANDOFF_V2",
] as const;

export type V2Flag = (typeof V2_FLAGS)[number];

/** Only an explicit "true" enables a flag; anything else keeps V1 active. */
function readFlag(name: V2Flag): boolean {
  return process.env[name] === "true";
}

export function isEnabled(flag: V2Flag): boolean {
  return readFlag(flag);
}

/**
 * Some capabilities are meaningless without their data layer. Declaring the
 * dependency here stops a preview being switched into a half-enabled state
 * that shows V2 chrome over V1 data.
 */
const REQUIRES: Partial<Record<V2Flag, V2Flag[]>> = {
  PHOTO_SPEC_ENGINE_V2: ["GLOBAL_VISA_DATA_V2"],
  FAMILY_MINOR_LOGIC_V2: ["GLOBAL_VISA_DATA_V2"],
  VISA_CLARITY_ENGINE_V2: ["GLOBAL_VISA_DATA_V2"],
  AI_VISA_COACH_V2: ["GLOBAL_VISA_DATA_V2"],
};

/** True only when the flag and everything it depends on are enabled. */
export function isUsable(flag: V2Flag): boolean {
  if (!isEnabled(flag)) return false;
  return (REQUIRES[flag] ?? []).every(isEnabled);
}

/** Snapshot for the per-phase migration report. Contains no secrets. */
export function flagSnapshot(): Record<V2Flag, { enabled: boolean; usable: boolean }> {
  return Object.fromEntries(
    V2_FLAGS.map((f) => [f, { enabled: isEnabled(f), usable: isUsable(f) }])
  ) as Record<V2Flag, { enabled: boolean; usable: boolean }>;
}
