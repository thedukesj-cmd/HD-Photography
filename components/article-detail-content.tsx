"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  User,
} from "lucide-react"

import type { Tutorial } from "@/types"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"

type TutorialWithHtml = Tutorial & {
  contentHtml?: string
  contentHtmlVi?: string
}

const difficultyColor: Record<string, string> = {
  Beginner:
    "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Intermediate:
    "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Advanced:
    "bg-red-500/20 text-red-400 border-red-500/30",
}

const difficultyVi: Record<string, string> = {
  Beginner: "Cơ bản",
  Intermediate: "Trung cấp",
  Advanced: "Nâng cao",
}

function formatDate(
  date: string,
  language: string
) {
  if (!date) return ""

  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return date
  }

  return new Intl.DateTimeFormat(
    language === "vi"
      ? "vi-VN"
      : "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }
  ).format(parsed)
}

export function ArticleDetailContent({
  tutorial,
}: {
  tutorial: TutorialWithHtml
}) {
  const { language } = useLanguage()

  const displayTitle =
    language === "vi"
      ? tutorial.titleVi ||
        tutorial.title
      : tutorial.title

  const displayExcerpt =
    language === "vi"
      ? tutorial.excerptVi ||
        tutorial.excerpt
      : tutorial.excerpt

  const displayReadTime =
    language === "vi"
      ? tutorial.readTimeVi ||
        tutorial.readTime
      : tutorial.readTime

  const displayTags =
    language === "vi" &&
    tutorial.tagsVi?.length
      ? tutorial.tagsVi
      : tutorial.tags

  const displayDifficulty =
    language === "vi"
      ? tutorial.difficultyVi ||
        (tutorial.difficulty
          ? difficultyVi[
              tutorial.difficulty
            ] ||
            tutorial.difficulty
          : "")
      : tutorial.difficulty || ""

  const displayAuthor =
    language === "vi" &&
    tutorial.author ===
      "Hong-Duc Nguyen"
      ? "Nguyễn Hồng Đức"
      : tutorial.author

  const displayContent =
    language === "vi"
      ? tutorial.contentHtmlVi ||
        tutorial.contentHtml ||
        ""
      : tutorial.contentHtml || ""

  const displayDate =
    formatDate(
      tutorial.date,
      language
    )

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero */}
      <section className="relative flex min-h-[420px] items-end overflow-hidden md:min-h-[500px]">
        {tutorial.featuredImage && (
          <div className="absolute inset-0">
            <Image
              src={
                tutorial.featuredImage
              }
              alt={displayTitle}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/55 to-zinc-950/10" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
          <Link
            href="/tutorials"
            className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-amber-400"
          >
            <ArrowLeft className="h-4 w-4" />

            {language === "vi"
              ? "Quay lại Bài Viết"
              : "Back to Articles"}
          </Link>

          {tutorial.difficulty &&
            displayDifficulty && (
              <div>
                <span
                  className={cn(
                    "mb-4 inline-block rounded-full border px-3 py-1 text-xs font-medium",
                    difficultyColor[
                      tutorial.difficulty
                    ] ||
                      difficultyColor.Beginner
                  )}
                >
                  {displayDifficulty}
                </span>
              </div>
            )}

          <h1 className="text-balance font-playfair text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {displayTitle}
          </h1>
        </div>
      </section>

      {/* Article information */}
      <div className="border-b border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {displayAuthor}
            </span>

            {displayDate && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {displayDate}
              </span>
            )}

            {displayReadTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {displayReadTime}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        {displayExcerpt && (
          <p className="mb-10 text-xl italic leading-relaxed text-zinc-400">
            {displayExcerpt}
          </p>
        )}

        <div
          className="prose-photography"
          dangerouslySetInnerHTML={{
            __html: displayContent,
          }}
        />

        {displayTags.length > 0 && (
          <div className="mt-12 border-t border-zinc-800 pt-8">
            <div className="flex flex-wrap items-center gap-3">
              <Tag className="h-4 w-4 text-zinc-500" />

              {displayTags.map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-400"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}