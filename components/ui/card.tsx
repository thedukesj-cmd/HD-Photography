import { cn } from "@/lib/utils"

type CardProps = {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({
  children,
  className,
  hover = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden",

        hover &&
          "hover:border-amber-500/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-950/20 transition-all duration-300",

        className
      )}
    >
      {children}
    </div>
  )
}