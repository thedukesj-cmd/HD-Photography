import type { Metadata } from "next"
import { getAllShowcases } from "@/lib/content"
import { ShowcaseHero } from "@/components/showcase-hero"
import { ShowcaseArchive } from "@/components/showcase-archive"
import { ShowcaseEmptyState } from "@/components/showcase-empty-state"

export const metadata: Metadata = {
  title: "Photography Showcases",
  description:
    "Browse photography showcases featuring curated collections and memorable work from HD Photography members.",
}

export default function ShowcasePage() {
  const showcases = getAllShowcases()

  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <ShowcaseHero />

        {showcases.length > 0 ? (
          <ShowcaseArchive showcases={showcases} />
        ) : (
          <ShowcaseEmptyState />
        )}
      </div>
    </div>
  )
}