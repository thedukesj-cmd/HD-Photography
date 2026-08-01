"use client"

import { useLanguage } from "@/components/language-provider"
import { SectionTitle } from "@/components/ui/section-title"
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
        <SectionTitle
  eyebrow={translations.home.news.eyebrow}
  title={translations.home.news.title}
  centered={false}
/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {news.map((item) => (
          <NewsCard key={item.slug} item={item} />
         ))}
        </div>
      </div>
    </section>
  )
}