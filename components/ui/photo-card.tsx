import type { ReactNode } from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type PhotoCardProps = {
  children: ReactNode
  className?: string
}

export function PhotoCard({
  children,
  className,
}: PhotoCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden border-zinc-800 bg-zinc-900/50",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:border-amber-500/50",
        "hover:shadow-xl hover:shadow-amber-950/20",
        className
      )}
    >
      {children}
    </Card>
  )
}