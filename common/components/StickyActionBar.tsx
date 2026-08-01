"use client";

import type { ReactNode } from "react";

/**
 * Bottom-anchored action bar for multi-step flows.
 *
 * On small viewports the primary action in a long wizard step scrolled out of
 * reach; this pins it while keeping it clear of the iOS home indicator. Above
 * `sm` it returns to normal in-flow layout so it does not float over content
 * on desktop, where there is no reachability problem.
 */
export function StickyActionBar({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      // `pe-24` below `sm` keeps the right-aligned primary action clear of the
      // floating assistant launcher, which occupies the same bottom-right
      // corner. Above `sm` the bar is in normal flow and needs no reservation.
      className={`sticky bottom-0 z-30 -mx-6 mt-6 border-t border-slate-200 bg-white/95 py-4 ps-6 pe-24 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:backdrop-blur-none ${className}`}
      style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
    >
      {children}
    </div>
  );
}
