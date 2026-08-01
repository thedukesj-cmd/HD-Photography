import Link from "next/link"
import { cn } from "@/lib/utils"

type ButtonProps = {
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
  href?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "outline" | "ghost"
  className?: string
}

export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className,
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200",

    variant === "primary" &&
      "bg-amber-500 hover:bg-amber-400 text-zinc-950 hover:shadow-lg hover:shadow-amber-500/30",

    variant === "secondary" &&
      "bg-zinc-800 hover:bg-zinc-700 text-white",

    variant === "outline" &&
      "border border-zinc-700 hover:border-amber-400 text-white hover:text-amber-400",

    variant === "ghost" &&
      "text-zinc-300 hover:text-white hover:bg-zinc-800",

    size === "sm" && "px-4 py-2 text-sm",
    size === "md" && "px-6 py-3",
    size === "lg" && "px-8 py-4 text-lg",

    className
  )

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={styles}
    >
      {children}
    </button>
  )
}