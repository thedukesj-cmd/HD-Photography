"use client"

import { useLanguage } from "@/components/language-provider"
import { SectionTitle } from "@/components/ui/section-title"
import { NewsCard } from "@/components/news-card"
import type { NewsItem } from "@/types"

type HomeNewsProps = {
  news: NewsItem[]
}

export function HomeNews({
  news,
}: HomeNewsProps) {
  const { translations } = useLanguage()
  const text = translations.home.news

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow={text.eyebrow}
          title={text.title}
          centered={false}
        />

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {news.map((item) => (
            <NewsCard
              key={item.slug}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  )
}