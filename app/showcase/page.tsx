import type { Metadata } from "next"
import { getAllShowcases } from "@/lib/content"
import { ShowcaseHero } from "@/components/showcase-hero"
import { ShowcaseArchive } from "@/components/showcase-archive"
import { ShowcaseEmptyState } from "@/components/showcase-empty-state"

export const metadata: Metadata = {
  title: "Monthly Showcase Archive",
  description: "Browse our archive of monthly photography showcases — curated collections of the best work from club members.",
}

export default function ShowcasePage() {
  const showcases = getAllShowcases()
  const byYear = showcases.reduce<Record<number, typeof showcases>>((acc, s) => {
    acc[s.year] = acc[s.year] || []
    acc[s.year].push(s)
    return acc
  }, {})
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a)

  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <ShowcaseHero />
        <ShowcaseArchive years={years} byYear={byYear} />
      {showcases.length === 0 && <ShowcaseEmptyState />}
      </div>
    </div>
  )
}
