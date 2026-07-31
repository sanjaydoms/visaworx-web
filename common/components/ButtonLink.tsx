import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: ButtonLinkProps) {
  const styles =
    variant === "primary"
      ? "bg-[#e6282f] text-white hover:bg-[#c92027]"
      : "border border-[#0b3478]/20 bg-white text-[#0b3478] hover:bg-[#f4f7fb]";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${styles}`}
    >
      {children}
    </Link>
  );
}
