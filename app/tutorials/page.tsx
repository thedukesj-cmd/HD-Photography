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
    <div className="bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <ArticlesHero />

        <TutorialsContent tutorials={tutorials} />
      </div>
    </div>
  )
}