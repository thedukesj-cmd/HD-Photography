import { NewsCard } from "@/components/news-card"
import type { NewsItem } from "@/types"

type NewsGridProps = {
  news: NewsItem[]
}

export function NewsGrid({
  news,
}: NewsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {news.map((item) => (
        <NewsCard
          key={item.slug}
          item={item}
        />
      ))}
    </div>
  )
}