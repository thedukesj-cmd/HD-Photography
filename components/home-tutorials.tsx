"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import type { Tutorial } from "@/types"


type HomeTutorialsProps = {
  tutorials: Tutorial[]
}

export function HomeTutorials({ tutorials }: HomeTutorialsProps) {
  const { translations } = useLanguage()
  const text = translations.home.tutorials

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
              {text.eyebrow}
            </p>

            <h2 className="font-playfair text-4xl md:text-5xl text-white font-bold">
              {text.title}
            </h2>
          </div>

          <Link
            href="/tutorials"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium transition-colors shrink-0"
          >
            {text.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <Link
              key={tutorial.slug}
              href={`/tutorials/${tutorial.slug}`}
              className="group block"
            >
              <article className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-950/20 h-full">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={tutorial.featuredImage}
                    alt={tutorial.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="p-5 space-y-2">
                   {tutorial.difficulty && (
                    <span className="text-xs text-amber-400/80 font-medium uppercase tracking-wide">
                      {tutorial.difficulty}
                    </span>
                    )}
                  <h3 className="font-playfair text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
                    {tutorial.title}
                  </h3>

                  <p className="text-zinc-400 text-sm line-clamp-2">
                    {tutorial.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}