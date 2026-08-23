"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"

import type { NewsItem } from "@/types"
import { PhotoCard } from "@/components/ui/photo-card"
import { useLanguage } from "@/components/language-provider"

export function NewsCard({
  item,
}: {
  item: NewsItem
}) {
  const { language } = useLanguage()

  const displayTitle =
    language === "vi"
      ? item.titleVi || item.title
      : item.title

  const displayExcerpt =
    language === "vi"
      ? item.excerptVi || item.excerpt
      : item.excerpt

  const displayCategory =
    language === "vi"
      ? item.categoryVi || item.category
      : item.category

  const parsedDate = new Date(item.date)

  const formattedDate = Number.isNaN(
    parsedDate.getTime()
  )
    ? item.date
    : new Intl.DateTimeFormat(
        language === "vi"
          ? "vi-VN"
          : "en-US",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        }
      ).format(parsedDate)

  return (
    <Link
      href={`/news/${item.slug}`}
      className="group block h-full"
    >
      <PhotoCard className="flex h-full flex-col overflow-hidden">
        {item.featuredImage && (
          <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
            <Image
              src={item.featuredImage}
              alt={displayTitle}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          {displayCategory && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
              {displayCategory}
            </p>
          )}

          <div className="mb-4 flex items-center gap-2 text-sm text-zinc-500">
            <Calendar className="h-4 w-4" />
            {formattedDate}
          </div>

          <h3 className="font-playfair text-2xl font-semibold leading-snug text-white transition-colors group-hover:text-amber-400">
            {displayTitle}
          </h3>

          {displayExcerpt && (
            <p className="mt-3 line-clamp-3 leading-relaxed text-zinc-400">
              {displayExcerpt}
            </p>
          )}

          <div className="mt-auto pt-6">
            <span className="inline-flex items-center gap-2 font-medium text-amber-400">
              {language === "vi"
                ? "Đọc tiếp"
                : "Read more"}

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </PhotoCard>
    </Link>
  )
}