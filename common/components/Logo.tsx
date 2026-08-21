"use client";

import Image from "next/image";
import { useState } from "react";

// width/height are the intrinsic pixel sizes of the supplied files. They set the
// aspect ratio the browser reserves before the image loads, so they must track
// the real assets — a mismatch letterboxes the artwork inside a wrongly shaped box.
//
// srcOnDark is knockout artwork for dark surfaces: both supplied logos are dark
// ink on transparency and are illegible on the navy footer. Each was derived from
// its master by recolouring the ink to white and leaving the red accent alone;
// the masters are untouched and still serve every light surface. brand-rules.md
// makes both logos immutable, so these are placeholders — when the brand owners
// supply official reversed files, replace the assets and these two lines still
// point at them.
const logos = {
  visaworx: {
    src: "/brand/visaworx-logo.png",
    srcOnDark: "/brand/visaworx-logo-reversed.png",
    alt: "Visaworx",
    width: 1728,
    height: 524,
  },
  klar: {
    src: "/brand/klar-travels-logo.png",
    srcOnDark: "/brand/klar-travels-logo-reversed.png",
    alt: "Klar Travels",
    width: 1320,
    height: 624,
  },
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

  return (
    <Image
      src={onDark ? logo.srcOnDark : logo.src}
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
