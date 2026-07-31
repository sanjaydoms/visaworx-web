import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
}: ButtonLinkProps) {
  const baseStyles =
    "inline-flex min-h-[48px] items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles =
    variant === "primary"
      ? "bg-[#e6282f] text-white hover:bg-[#c92027] focus:ring-[#e6282f]"
      : "border border-[#071f4a] bg-white text-[#071f4a] shadow-sm hover:bg-[#f4f7fb] hover:shadow-md hover:-translate-y-0.5 focus:ring-[#071f4a]";

  const widthStyles = fullWidth ? "w-full" : "w-full sm:w-auto";

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variantStyles} ${widthStyles} ${className}`}
    >
      {children}
    </Link>
  );
}

