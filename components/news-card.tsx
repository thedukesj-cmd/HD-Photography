"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight } from "lucide-react"

import type { NewsItem } from "@/types"
import { PhotoCard } from "@/components/ui/photo-card"
import { useLanguage } from "@/components/language-provider"

export function NewsCard({ item }: { item: NewsItem }) {
  const { language } = useLanguage()

  const formattedDate = new Date(item.date).toLocaleDateString(
    language === "vi" ? "vi-VN" : "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  )

  return (
    <Link href={`/news/${item.slug}`} className="block group">
      <PhotoCard className="group h-full">
        {item.featuredImage && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={item.featuredImage}
              alt={item.title}
              fill
              sizes="(max-width:768px)100vw,(max-width:1280px)50vw,33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <div className="p-6">
          {item.category && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber-400">
              {item.category}
            </p>
          )}

          <div className="mb-4 flex items-center gap-2 text-sm text-zinc-500">
            <Calendar className="h-4 w-4" />
            {formattedDate}
          </div>

          <h3 className="mb-3 font-playfair text-2xl font-semibold text-white transition-colors group-hover:text-amber-400">
            {item.title}
          </h3>

          <p className="mb-6 line-clamp-3 text-zinc-400">
            {item.excerpt}
          </p>

          <div className="flex items-center gap-2 font-medium text-amber-400 transition-transform group-hover:translate-x-1">
            <span>
              {language === "vi" ? "Đọc tiếp" : "Read more"}
            </span>

            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </PhotoCard>
    </Link>
  )
}