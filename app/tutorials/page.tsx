import type { Metadata } from "next"

import { getAllTutorials } from "@/lib/content"
import { TutorialsContent } from "@/components/tutorials-content"
import { ArticlesHero } from "@/components/articles-hero"

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Photography articles from HD Photography covering technique, creativity, travel, equipment, post-processing, and the art of photography.",
}

export default function TutorialsPage() {
  const tutorials = getAllTutorials()

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <ArticlesHero />
        <TutorialsContent tutorials={tutorials} />
      </div>
    </div>
  )
}