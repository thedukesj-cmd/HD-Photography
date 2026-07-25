import type { Metadata } from "next"
import { getAllNews } from "@/lib/content"
import { NewsHero } from "@/components/news-hero"
import { NewsGrid } from "@/components/news-grid"
import { NewsEmptyState } from "@/components/news-empty-state"

export const metadata: Metadata = {
  title: "News & Events",
  description: "Latest news, events, and announcements from Aperture Club — exhibitions, workshops, member achievements, and more.",
}

export default function NewsPage() {
  const news = getAllNews()

  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <NewsHero />
      <NewsGrid news={news} />
      {news.length === 0 && <NewsEmptyState />}
      </div>
    </div>
  )
}
