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

const difficultyVi: Record<string, string> = {
  Beginner: "Cơ bản",
  Intermediate: "Trung cấp",
  Advanced: "Nâng cao",
}

function formatDate(date: string, language: string) {
  if (!date) return ""

  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return date
  }

  return new Intl.DateTimeFormat(
    language === "vi" ? "vi-VN" : "en-US",
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

  const normalizedQuery = query.trim().toLowerCase()

  const filtered = tutorials.filter((tutorial) => {
    if (!normalizedQuery) return true

    const translatedDifficulty = tutorial.difficulty
      ? difficultyVi[tutorial.difficulty] || tutorial.difficulty
      : ""

    return (
      tutorial.title.toLowerCase().includes(normalizedQuery) ||
      tutorial.author.toLowerCase().includes(normalizedQuery) ||
      tutorial.excerpt.toLowerCase().includes(normalizedQuery) ||
      tutorial.tags.some((tag) =>
        tag.toLowerCase().includes(normalizedQuery)
      ) ||
      tutorial.difficulty
        ?.toLowerCase()
        .includes(normalizedQuery) ||
      translatedDifficulty
        .toLowerCase()
        .includes(normalizedQuery)
    )
  })

  const difficultyLabel = (difficulty: string) =>
    language === "vi"
      ? difficultyVi[difficulty] ?? difficulty
      : difficulty

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
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-11 pr-16 text-zinc-100 placeholder:text-zinc-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
          >
            {language === "vi" ? "Xóa" : "Clear"}
          </button>
        )}
      </div>

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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((tutorial) => {
          const displayDate = formatDate(
            tutorial.date,
            language
          )

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
                      src={tutorial.featuredImage}
                      alt={tutorial.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {tutorial.difficulty && (
                      <span
                        className={cn(
                          "absolute left-3 top-3 rounded-full border px-2.5 py-1 text-xs font-medium",
                          difficultyColor[
                            tutorial.difficulty
                          ] ||
                            difficultyColor.Beginner
                        )}
                      >
                        {difficultyLabel(
                          tutorial.difficulty
                        )}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-playfair text-xl font-semibold leading-snug text-white transition-colors group-hover:text-amber-400">
                    {tutorial.title}
                  </h3>

                  {tutorial.excerpt && (
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                      {tutorial.excerpt}
                    </p>
                  )}

                  <div className="mt-auto pt-5">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {tutorial.author}
                      </span>

                      {displayDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {displayDate}
                        </span>
                      )}

                      {tutorial.readTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {tutorial.readTime}
                        </span>
                      )}
                    </div>

                    {tutorial.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {tutorial.tags
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

      {filtered.length === 0 && query && (
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