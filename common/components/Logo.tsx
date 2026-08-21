"use client";

import Image from "next/image";
import { useState } from "react";

// Intrinsic pixel sizes of the supplied files. These set the aspect ratio the
// browser reserves before the image loads, so they must track the real assets —
// a mismatch letterboxes the artwork inside a wrongly shaped box.
const logos = {
  visaworx: { src: "/brand/visaworx-logo.png", alt: "Visaworx", width: 1728, height: 524 },
  klar: { src: "/brand/klar-travels-logo.png", alt: "Klar Travels", width: 1320, height: 624 },
} as const;

type LogoProps = {
  kind?: keyof typeof logos;
  className?: string;
};

export function Logo({ kind = "visaworx", className = "" }: LogoProps) {
  const [error, setError] = useState(false);

  if (error) {
    return null;
  }

  const logo = logos[kind];

  return (
    <Image
      src={logo.src}
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
