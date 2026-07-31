"use client";

import Image from "next/image";
import { useState } from "react";

type LogoProps = {
  kind?: "visaworx" | "klar";
  className?: string;
};

export function Logo({ kind = "visaworx", className = "" }: LogoProps) {
  const [error, setError] = useState(false);

  if (error) {
    return null;
  }

  const source =
    kind === "visaworx"
      ? "/brand/visaworx-logo.png"
      : "/brand/klar-travels-logo.png";

  return (
    <Image
      src={source}
      alt={kind === "visaworx" ? "Visaworx" : "Klar Travels"}
      width={kind === "visaworx" ? 420 : 220}
      height={120}
      className={className}
      priority
      onError={() => setError(true)}
      style={{ objectFit: "contain" }}
    />
  );
}

