import type { Metadata } from "next"

import { getAllNews } from "@/lib/content"
import { NewsHero } from "@/components/news-hero"
import { NewsGrid } from "@/components/news-grid"
import { NewsEmptyState } from "@/components/news-empty-state"

export const metadata: Metadata = {
  title: "News",
  description:
    "Latest news, updates, and announcements from HD Photography, including new photo collections, articles, and featured photographers.",
}

export default function NewsPage() {
  const news = getAllNews()

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <NewsHero />

        {news.length > 0 ? (
          <NewsGrid news={news} />
        ) : (
          <NewsEmptyState />
        )}
      </div>
    </div>
  )
}