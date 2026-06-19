import type { Metadata } from "next"
import { getAllNews } from "@/lib/content"
import { NewsCard } from "@/components/news-card"

export const metadata: Metadata = {
  title: "News & Events",
  description: "Latest news, events, and announcements from Aperture Club — exhibitions, workshops, member achievements, and more.",
}

export default function NewsPage() {
  const news = getAllNews()
  const categories = Array.from(new Set(news.map(n => n.category).filter(Boolean)))

  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">Stay Updated</p>
          <h1 className="font-playfair text-5xl md:text-6xl text-white font-bold">News & Events</h1>
          <p className="text-zinc-400 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            Club announcements, exhibition openings, workshop schedules, member achievements, and more.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {news.map(item => <NewsCard key={item.slug} item={item} />)}
        </div>
        {news.length === 0 && (
          <div className="text-center py-20 text-zinc-600">No news items yet.</div>
        )}
      </div>
    </div>
  )
}
