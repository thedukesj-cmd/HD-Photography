"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  BookOpen,
  Calendar,
  Clock,
  Search,
  User,
} from "lucide-react"

import type { Tutorial } from "@/types"
import { cn } from "@/lib/utils"
import { PhotoCard } from "@/components/ui/photo-card"
import { useLanguage } from "@/components/language-provider"

const difficultyColor: Record<string, string> = {
  Beginner:
    "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Intermediate:
    "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Advanced:
    "bg-red-500/20 text-red-400 border-red-500/30",
}

const defaultDifficultyVi: Record<string, string> = {
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
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }
  ).format(parsed)
}

export function TutorialSearch({
  tutorials,
}: {
  tutorials: Tutorial[]
}) {
  const [query, setQuery] = useState("")
  const { language } = useLanguage()

  const normalizedQuery =
    query.trim().toLowerCase()

  const filtered = tutorials.filter(
    (tutorial) => {
      if (!normalizedQuery) {
        return true
      }

      const searchableValues = [
        tutorial.title,
        tutorial.titleVi,
        tutorial.author,
        tutorial.excerpt,
        tutorial.excerptVi,
        tutorial.difficulty,
        tutorial.difficultyVi,
        tutorial.readTime,
        tutorial.readTimeVi,
        ...tutorial.tags,
        ...(tutorial.tagsVi || []),
      ]
        .filter(Boolean)
        .map((value) =>
          String(value).toLowerCase()
        )

      if (
        tutorial.difficulty &&
        defaultDifficultyVi[
          tutorial.difficulty
        ]
      ) {
        searchableValues.push(
          defaultDifficultyVi[
            tutorial.difficulty
          ].toLowerCase()
        )
      }

      return searchableValues.some(
        (value) =>
          value.includes(normalizedQuery)
      )
    }
  )

  if (tutorials.length === 0) {
    return (
      <div className="py-20 text-center">
        <BookOpen className="mx-auto mb-5 h-12 w-12 text-zinc-700" />

        <h2 className="font-playfair text-3xl font-bold text-white">
          {language === "vi"
            ? "Chưa có bài viết"
            : "No Articles Yet"}
        </h2>

        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-zinc-500">
          {language === "vi"
            ? "Những bài viết về kỹ thuật, thiết bị, hậu kỳ, kinh nghiệm và nghệ thuật nhiếp ảnh sẽ được đăng tại đây."
            : "Articles about technique, equipment, post-processing, photographic experience, and the art of photography will appear here."}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="relative mx-auto max-w-2xl">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

        <input
          type="text"
          placeholder={
            language === "vi"
              ? "Tìm bài viết, chủ đề hoặc tác giả..."
              : "Search articles, tags, or authors..."
          }
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-11 pr-16 text-zinc-100 placeholder:text-zinc-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
          >
            {language === "vi"
              ? "Xóa"
              : "Clear"}
          </button>
        )}
      </div>

      {/* Search result count */}
      {query && (
        <p className="text-center text-sm text-zinc-500">
          {filtered.length === 0
            ? language === "vi"
              ? `Không tìm thấy bài viết cho "${query}"`
              : `No articles found for "${query}"`
            : language === "vi"
              ? `Tìm thấy ${filtered.length} bài viết`
              : `${filtered.length} ${
                  filtered.length === 1
                    ? "article"
                    : "articles"
                } found`}
        </p>
      )}

      {/* Article cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((tutorial) => {


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
                  ? defaultDifficultyVi[
                      tutorial.difficulty
                    ] ||
                    tutorial.difficulty
                  : "")
              : tutorial.difficulty || ""

          const displayDate =
            formatDate(
              tutorial.date,
              language
            )

          const displayAuthor =
            language === "vi" &&
            tutorial.author === "Hong-Duc Nguyen"
            ? "Nguyễn Hồng Đức"
            : tutorial.author


          return (
            <PhotoCard
              key={tutorial.slug}
              className="group h-full bg-zinc-900/50"
            >
              <Link
                href={`/tutorials/${tutorial.slug}`}
                className="flex h-full flex-col"
              >
                {tutorial.featuredImage && (
                  <div className="relative aspect-video overflow-hidden bg-zinc-900">
                    <Image
                      src={
                        tutorial.featuredImage
                      }
                      alt={displayTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {tutorial.difficulty &&
                      displayDifficulty && (
                        <span
                          className={cn(
                            "absolute left-3 top-3 rounded-full border px-2.5 py-1 text-xs font-medium",
                            difficultyColor[
                              tutorial
                                .difficulty
                            ] ||
                              difficultyColor.Beginner
                          )}
                        >
                          {
                            displayDifficulty
                          }
                        </span>
                      )}
                  </div>
                )}

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-playfair text-xl font-semibold leading-snug text-white transition-colors group-hover:text-amber-400">
                    {displayTitle}
                  </h3>

                  {displayExcerpt && (
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                      {displayExcerpt}
                    </p>
                  )}

                  <div className="mt-auto pt-5">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {displayAuthor}
                      </span>

                      {displayDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {displayDate}
                        </span>
                      )}

                      {displayReadTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {displayReadTime}
                        </span>
                      )}
                    </div>

                    {displayTags.length >
                      0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {displayTags
                          .slice(0, 3)
                          .map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </PhotoCard>
          )
        })}
      </div>

      {filtered.length === 0 &&
        query && (
          <div className="py-12 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-zinc-700" />

            <p className="text-zinc-500">
              {language === "vi"
                ? "Hãy thử một từ khóa khác."
                : "Try a different search term."}
            </p>
          </div>
        )}
    </div>
  )
}