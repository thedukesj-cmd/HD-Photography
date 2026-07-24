import { ShowcaseCard } from "@/components/showcase-card"
import type { Showcase } from "@/types"

type ShowcaseArchiveProps = {
  years: number[]
  byYear: Record<number, Showcase[]>
}

export function ShowcaseArchive({
  years,
  byYear,
}: ShowcaseArchiveProps) {
  return (
    <div className="space-y-14">
      {years.map((year) => (
        <div key={year}>
          <h2 className="font-playfair text-3xl text-zinc-500 font-bold mb-6 flex items-center gap-4">
            {year}
            <span className="h-px flex-1 bg-zinc-800" />
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {byYear[year].map((showcase) => (
              <ShowcaseCard
                key={showcase.slug}
                showcase={showcase}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}