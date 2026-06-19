import type { Metadata } from "next"
import { getAllShowcases } from "@/lib/content"
import { ShowcaseCard } from "@/components/showcase-card"

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
        <div className="text-center mb-16">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">Archive</p>
          <h1 className="font-playfair text-5xl md:text-6xl text-white font-bold">Monthly Showcase</h1>
          <p className="text-zinc-400 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            Each month we curate the finest work submitted around a chosen theme. 
            Browse the archive to see the breadth of our members' vision.
          </p>
        </div>
        <div className="space-y-14">
          {years.map(year => (
            <div key={year}>
              <h2 className="font-playfair text-3xl text-zinc-500 font-bold mb-6 flex items-center gap-4">
                {year}
                <span className="h-px flex-1 bg-zinc-800" />
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {byYear[year].map(s => <ShowcaseCard key={s.slug} showcase={s} />)}
              </div>
            </div>
          ))}
        </div>
        {showcases.length === 0 && (
          <div className="text-center py-20 text-zinc-600">No showcases yet.</div>
        )}
      </div>
    </div>
  )
}
