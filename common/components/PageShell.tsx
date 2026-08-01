import type { ReactNode } from "react";

/**
 * Standard vertical rhythm and bottom clearance for a page.
 *
 * Every route previously chose its own `space-y-*` and `py-*` values, which is
 * where alignment drift came from. PageShell also reserves clearance at the
 * foot of the page so the floating assistant launcher never lands on top of
 * the last interactive row, and respects the iOS home-indicator inset.
 */
export function PageShell({
  children,
  spacing = "normal",
}: {
  children: ReactNode;
  /** `tight` for focused flows (wizards, results), `normal` for content pages. */
  spacing?: "tight" | "normal";
}) {
  // Launcher clearance and safe-area inset are applied once on <main> in the
  // root layout, so PageShell only owns vertical rhythm.
  const rhythm = spacing === "tight" ? "space-y-8 py-8 sm:py-12" : "space-y-12 py-10 sm:py-16";

  return <div className={rhythm}>{children}</div>;
}
