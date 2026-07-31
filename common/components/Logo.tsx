import Image from "next/image";

type LogoProps = {
  kind?: "visaworx" | "klar";
  className?: string;
};

export function Logo({ kind = "visaworx", className = "" }: LogoProps) {
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
    />
  );
}
