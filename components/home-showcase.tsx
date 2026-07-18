"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { useLanguage } from "@/components/language-provider"

type Photo = {
  url: string
  title?: string
  photographer?: string
}

type Showcase = {
  slug: string
  month: string
  year: number
  theme: string
  photos: Photo[]
}

type HomeShowcaseProps = {
  showcase: Showcase
}

export function HomeShowcase({ showcase }: HomeShowcaseProps) {
  const { translations } = useLanguage()
  const text = translations.home.showcase

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
              {text.eyebrow}
            </p>

            <h2 className="font-playfair text-4xl md:text-5xl text-white font-bold">
              {showcase.month} {showcase.year}
            </h2>

            <p className="text-zinc-400 mt-2 italic text-lg">
              {text.themeLabel}: {showcase.theme}
            </p>
          </div>

          <Link
            href={`/showcase/${showcase.slug}`}
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium transition-colors shrink-0"
          >
            {text.viewFull}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {showcase.photos.slice(0, 6).map((photo, i) => (
            <Link
              key={i}
              href={`/showcase/${showcase.slug}`}
              className={`relative overflow-hidden rounded-lg group ${
                i === 0
                  ? "col-span-2 row-span-2 aspect-square md:aspect-auto"
                  : "aspect-square"
              }`}
            >
              <Image
                src={photo.url}
                alt={photo.title || text.defaultPhotoAlt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading={i < 3 ? "eager" : "lazy"}
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex flex-col justify-end p-4">
                <span className="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {photo.title}
                </span>

                <span className="text-zinc-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {photo.photographer}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}