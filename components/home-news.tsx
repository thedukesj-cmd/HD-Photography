"use client"

import { useLanguage } from "@/components/language-provider"

import { NewsCard } from "@/components/news-card"
import type { NewsItem } from "@/types"

type HomeNewsProps = {
  news: NewsItem[]
}

export function HomeNews({ news }: HomeNewsProps) {
  const { translations } = useLanguage()

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
          {translations.home.news.eyebrow}
        </p>

        <h2 className="font-playfair text-4xl md:text-5xl text-white font-bold">
          {translations.home.news.title}
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {news.map((item) => (
          <NewsCard key={item.slug} item={item} />
         ))}
        </div>
      </div>
    </section>
  )
}