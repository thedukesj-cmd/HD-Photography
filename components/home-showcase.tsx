"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Images } from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import type { Showcase } from "@/types"

type HomeShowcaseProps = {
  showcase: Showcase
}

function formatShowcaseDate(date: string, language: string) {
  if (!date) return ""

  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return date
  }

  return new Intl.DateTimeFormat(
    language === "vi" ? "vi-VN" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }
  ).format(parsed)
}

export function HomeShowcase({
  showcase,
}: HomeShowcaseProps) {
  const { translations, language } = useLanguage()
  const text = translations.home.showcase

  const displayDate = formatShowcaseDate(
    showcase.date,
    language
  )

  const showTheme =
    showcase.theme &&
    showcase.theme.trim().toLowerCase() !==
      showcase.title.trim().toLowerCase()

  const previewPhotos = showcase.photos.slice(0, 5)

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
              {text.eyebrow}
            </p>

            <h2 className="font-playfair text-4xl font-bold leading-tight text-white md:text-5xl">
              {showcase.title}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
              {displayDate && (
                <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
                  {displayDate}
                </p>
              )}

              <span className="flex items-center gap-1.5 text-sm text-zinc-500">
                <Images className="h-4 w-4" />
                {showcase.photos.length}
              </span>
            </div>

            {showTheme && (
              <p className="mt-4 font-playfair text-xl italic text-zinc-300">
                {showcase.theme}
              </p>
            )}

            {showcase.description && (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
                {showcase.description}
              </p>
            )}
          </div>

          <Link
            href={`/showcase/${showcase.slug}`}
            className="inline-flex shrink-0 items-center gap-2 font-medium text-amber-400 transition-colors hover:text-amber-300"
          >
            {text.viewFull}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {previewPhotos.length > 0 && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
            {previewPhotos.map((photo, i) => (
              <Link
                key={`${photo.url}-${i}`}
                href={`/showcase/${showcase.slug}`}
                className={`group relative overflow-hidden rounded-xl bg-zinc-900 ${
                  i === 0
                    ? "col-span-2 row-span-2 aspect-[4/3] md:aspect-auto md:min-h-[520px]"
                    : "aspect-square md:min-h-0"
                }`}
              >
                <Image
                  src={photo.url}
                  alt={
                    photo.title ||
                    showcase.title ||
                    text.defaultPhotoAlt
                  }
                  fill
                  sizes={
                    i === 0
                      ? "(max-width: 768px) 100vw, 50vw"
                      : "(max-width: 768px) 50vw, 25vw"
                  }
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={i === 0}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {(photo.title || photo.photographer) && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {photo.title && (
                      <p className="text-sm font-medium text-white">
                        {photo.title}
                      </p>
                    )}

                    {photo.photographer && (
                      <p className="mt-1 text-xs text-zinc-300">
                        {photo.photographer}
                      </p>
                    )}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}