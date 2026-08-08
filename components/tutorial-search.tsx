"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Calendar, Clock, User, BookOpen } from "lucide-react"

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

export function TutorialSearch({
  tutorials,
}: {
  tutorials: Tutorial[]
}) {
  const [query, setQuery] = useState("")
  const { language } = useLanguage()

  const filtered = tutorials.filter((tutorial) => {
    const q = query.toLowerCase()

    return (
      tutorial.title.toLowerCase().includes(q) ||
      tutorial.author.toLowerCase().includes(q) ||
      tutorial.excerpt.toLowerCase().includes(q) ||
      tutorial.tags.some((tag) =>
        tag.toLowerCase().includes(q)
      ) ||
      (tutorial.difficulty
        ?.toLowerCase()
        .includes(q) ??
        false)
    )
  })

  const difficultyLabel = (difficulty: string) =>
    language === "vi"
      ? difficultyVi[difficulty] ?? difficulty
      : difficulty

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

      {/* Results count */}
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

      {/* Article grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((tutorial) => (
          <PhotoCard
            key={tutorial.slug}
            className="group h-full bg-zinc-900/50"
          >
            <Link
              href={`/tutorials/${tutorial.slug}`}
              className="block"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={tutorial.featuredImage}
                  alt={tutorial.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {tutorial.difficulty && (
                  <span
                    className={cn(
                      "absolute left-3 top-3 rounded-full border px-2 py-1 text-xs font-medium",
                      difficultyColor[
                        tutorial.difficulty
                      ] || difficultyColor.Beginner
                    )}
                  >
                    {difficultyLabel(
                      tutorial.difficulty
                    )}
                  </span>
                )}
              </div>

              <div className="space-y-3 p-5">
                <h3 className="font-playfair text-lg font-semibold leading-snug text-white transition-colors group-hover:text-amber-400">
                  {tutorial.title}
                </h3>

                <p className="line-clamp-2 text-sm text-zinc-400">
                  {tutorial.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {tutorial.author}
                  </span>

                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(
                      tutorial.date
                    ).toLocaleDateString(
                      language === "vi"
                        ? "vi-VN"
                        : "en-GB",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>

                  {tutorial.readTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {tutorial.readTime}
                    </span>
                  )}
                </div>

                {tutorial.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
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
            </Link>
          </PhotoCard>
        ))}
      </div>

      {filtered.length === 0 && query && (
        <div className="py-16 text-center">
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