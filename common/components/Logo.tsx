"use client";

import Image from "next/image";
import { useState } from "react";

// Intrinsic pixel sizes of the supplied files. These set the aspect ratio the
// browser reserves before the image loads, so they must track the real assets —
// a mismatch letterboxes the artwork inside a wrongly shaped box.
const logos = {
  visaworx: {
    src: "/brand/visaworx-logo.png",
    // Knockout for dark surfaces: the navy ink recoloured to white with the red
    // accent untouched, derived from the master above. Placeholder until the
    // brand owner supplies an official reversed file — swap it in here.
    srcOnDark: "/brand/visaworx-logo-reversed.png",
    alt: "Visaworx",
    width: 1728,
    height: 524,
  },
  klar: { src: "/brand/klar-travels-logo.png", alt: "Klar Travels", width: 1320, height: 624 },
} as const;

type LogoProps = {
  kind?: keyof typeof logos;
  /** Use the knockout artwork, for logos sitting on a dark surface. */
  onDark?: boolean;
  className?: string;
};

export function Logo({ kind = "visaworx", onDark = false, className = "" }: LogoProps) {
  const [error, setError] = useState(false);

  if (error) {
    return null;
  }

  const logo = logos[kind];
  const source = onDark && "srcOnDark" in logo ? logo.srcOnDark : logo.src;

  return (
    <Image
      src={source}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      className={className}
      priority
      onError={() => setError(true)}
      style={{ objectFit: "contain" }}
    />
  );
}
