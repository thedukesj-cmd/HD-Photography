"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Calendar,
  Clock,
} from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import type { Tutorial } from "@/types"

type HomeTutorialsProps = {
  tutorials: Tutorial[]
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
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }
  ).format(parsed)
}

export function HomeTutorials({
  tutorials,
}: HomeTutorialsProps) {
  const { translations, language } = useLanguage()
  const text = translations.home.tutorials

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
              {text.eyebrow}
            </p>

            <h2 className="font-playfair text-4xl font-bold text-white md:text-5xl">
              {text.title}
            </h2>
          </div>

          <Link
            href="/tutorials"
            className="group inline-flex shrink-0 items-center gap-2 font-medium text-amber-400 transition-colors hover:text-amber-300"
          >
            {text.viewAll}

            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tutorials.map((tutorial) => {
            const displayDate = formatDate(
              tutorial.date,
              language
            )

            return (
              <Link
                key={tutorial.slug}
                href={`/tutorials/${tutorial.slug}`}
                className="group block"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-xl hover:shadow-black/20">
                  {tutorial.featuredImage && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                      <Image
                        src={tutorial.featuredImage}
                        alt={tutorial.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      {tutorial.difficulty && (
                        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                          {tutorial.difficulty}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500">
                      {displayDate && (
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {displayDate}
                        </span>
                      )}

                      {tutorial.readTime && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {tutorial.readTime}
                        </span>
                      )}
                    </div>

                    <h3 className="font-playfair text-xl font-semibold leading-snug text-white transition-colors group-hover:text-amber-400">
                      {tutorial.title}
                    </h3>

                    {tutorial.excerpt && (
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                        {tutorial.excerpt}
                      </p>
                    )}

                    <div className="mt-auto pt-5">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-400">
                        {text.viewAll}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}