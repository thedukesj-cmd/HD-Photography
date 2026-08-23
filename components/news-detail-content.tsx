"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import { NewsDetailText } from "@/components/news-detail-text"

type NewsDetailContentProps = {
  title: string
  titleVi?: string
  date: string
  featuredImage?: string
  excerpt?: string
  excerptVi?: string
  category?: string
  categoryVi?: string
  contentHtml?: string
  contentHtmlVi?: string
}

export function NewsDetailContent({
  title,
  titleVi,
  date,
  featuredImage,
  excerpt,
  excerptVi,
  category,
  categoryVi,
  contentHtml,
  contentHtmlVi,
}: NewsDetailContentProps) {
  const { language } = useLanguage()

  const displayTitle =
    language === "vi"
      ? titleVi || title
      : title

  const displayExcerpt =
    language === "vi"
      ? excerptVi || excerpt
      : excerpt

  const displayCategory =
    language === "vi"
      ? categoryVi || category
      : category

  const displayContent =
    language === "vi" && contentHtmlVi
      ? contentHtmlVi
      : contentHtml

  return (
    <div className="min-h-screen bg-zinc-950">
      <section className="relative flex min-h-[420px] items-end overflow-hidden md:min-h-[500px]">
        {featuredImage && (
          <div className="absolute inset-0">
            <Image
              src={featuredImage}
              alt={displayTitle}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/10" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-amber-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <NewsDetailText type="back" />
          </Link>

          {displayCategory && (
            <div>
              <span className="mb-4 inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-400">
                {displayCategory}
              </span>
            </div>
          )}

          <h1 className="font-playfair text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {displayTitle}
          </h1>

          {date && (
            <div className="mt-4 flex items-center gap-1.5 text-sm text-zinc-400">
              <Calendar className="h-3.5 w-3.5" />

              <NewsDetailText
                type="date"
                date={date}
              />
            </div>
          )}
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        {displayExcerpt && (
          <p className="mb-10 text-xl italic leading-relaxed text-zinc-400">
            {displayExcerpt}
          </p>
        )}

        {displayContent && (
          <div
            className="prose-photography"
            dangerouslySetInnerHTML={{
              __html: displayContent,
            }}
          />
        )}
      </article>
    </div>
  )
}