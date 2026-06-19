"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import type { Tutorial } from "@/types"
import { Search, Calendar, Clock, User, Tag, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const difficultyColor: Record<string, string> = {
  Beginner: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Intermediate: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
}

export function TutorialSearch({ tutorials }: { tutorials: Tutorial[] }) {
  const [query, setQuery] = useState("")

  const filtered = tutorials.filter(t => {
    const q = query.toLowerCase()
    return (
      t.title.toLowerCase().includes(q) ||
      t.author.toLowerCase().includes(q) ||
      t.excerpt.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.toLowerCase().includes(q)) ||
      (t.difficulty?.toLowerCase().includes(q) ?? false)
    )
  })

  return (
    <div className="space-y-8">
      {/* Search input */}
      <div className="relative max-w-lg mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search tutorials, tags, or authors..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-zinc-900 dark:bg-zinc-900 border border-zinc-700 dark:border-zinc-700 rounded-xl text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
          >
            Clear
          </button>
        )}
      </div>

      {/* Results count */}
      {query && (
        <p className="text-sm text-zinc-500 text-center">
          {filtered.length === 0
            ? `No tutorials found for "${query}"`
            : `${filtered.length} tutorial${filtered.length !== 1 ? "s" : ""} found`}
        </p>
      )}

      {/* Tutorial grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map(tutorial => (
          <article
            key={tutorial.slug}
            className="group bg-zinc-900/50 dark:bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-950/20"
          >
            <Link href={`/tutorials/${tutorial.slug}`} className="block">
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
                  <span className={cn(
                    "absolute top-3 left-3 text-xs px-2 py-1 rounded-full border font-medium",
                    difficultyColor[tutorial.difficulty] || difficultyColor.Beginner
                  )}>
                    {tutorial.difficulty}
                  </span>
                )}
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-playfair text-lg font-semibold text-white group-hover:text-amber-400 transition-colors leading-snug">
                  {tutorial.title}
                </h3>
                <p className="text-sm text-zinc-400 line-clamp-2">{tutorial.excerpt}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" /> {tutorial.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(tutorial.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                  {tutorial.readTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {tutorial.readTime}
                    </span>
                  )}
                </div>
                {tutorial.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tutorial.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>

      {filtered.length === 0 && query && (
        <div className="text-center py-16">
          <BookOpen className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-500">Try a different search term.</p>
        </div>
      )}
    </div>
  )
}
