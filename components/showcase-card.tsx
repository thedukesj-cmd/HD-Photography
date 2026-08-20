import Image from "next/image"
import Link from "next/link"
import { Images } from "lucide-react"

import type { Showcase } from "@/types"
import { PhotoCard } from "@/components/ui/photo-card"

function formatShowcaseDate(date: string) {
  if (!date) return ""

  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return date
  }

  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}

export function ShowcaseCard({
  showcase,
}: {
  showcase: Showcase
}) {
  const displayDate = formatShowcaseDate(showcase.date)

  return (
    <Link
      href={`/showcase/${showcase.slug}`}
      className="group block"
    >
      <PhotoCard className="group">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={showcase.featuredImage}
            alt={showcase.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-playfair text-xl font-bold leading-snug text-white transition-colors group-hover:text-amber-300">
              {showcase.title}
            </h3>

            {displayDate && (
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-amber-400">
                {displayDate}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-zinc-800 px-4 py-3">
          {showcase.theme &&
          showcase.theme.trim().toLowerCase() !==
          showcase.title.trim().toLowerCase() && (
          <p className="mb-1 line-clamp-1 text-sm font-medium text-zinc-300">
          {showcase.theme}
          </p>
     )}

          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span className="line-clamp-1 flex-1 pr-4">
              {showcase.description}
            </span>

            <span className="flex shrink-0 items-center gap-1">
              <Images className="h-3.5 w-3.5" />
              {showcase.photos.length}
            </span>
          </div>
        </div>
      </PhotoCard>
    </Link>
  )
}