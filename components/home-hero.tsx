"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { useLanguage } from "@/components/language-provider"

type HomeHeroProps = {
  image?: string
  imageAlt?: string
}

export function HomeHero({
  image,
  imageAlt = "HD Photography featured photograph",
}: HomeHeroProps) {
  const { translations } = useLanguage()
  const hero = translations.home.hero

  const heroImage =
    image ||
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80"

  return (
    <section className="relative min-h-[72vh] md:min-h-[78vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/55 via-zinc-950/20 to-zinc-950" />

        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/20 via-transparent to-zinc-950/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-amber-400 sm:text-base md:text-lg">
          {hero.eyebrow}
        </p>

        <h1 className="font-playfair text-5xl font-bold leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-8xl">
          {hero.titleLine1}
          <br />
          <span className="text-amber-400">
            {hero.titleLine2}
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-zinc-200 sm:text-lg md:text-xl">
          {hero.description}
        </p>

        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/showcase"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-4 font-semibold text-zinc-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20"
          >
            {hero.primaryButton}
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/members/hong-duc"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-black/20 px-8 py-4 font-medium text-white backdrop-blur-sm transition-all duration-200 hover:border-white hover:bg-black/35"
          >
            {hero.secondaryButton}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent" />
    </section>
  )
}