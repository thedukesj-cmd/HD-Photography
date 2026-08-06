"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { useLanguage } from "@/components/language-provider"

export function HomeHero() {
  const { translations } = useLanguage()
  const hero = translations.home.hero

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80"
          alt="Mountain landscape at golden hour"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/30 to-zinc-950" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <p className="text-amber-400 text-xl md:text-2xl font-bold uppercase tracking-[0.45em] mb-8">
          {hero.eyebrow}
        </p>

        <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-8">
          {hero.titleLine1}
          <br />
          <em className="text-amber-400 not-italic">
            {hero.titleLine2}
          </em>
        </h1>

        <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          {hero.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/showcase"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5"
          >
            {hero.primaryButton}
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/members/hong-duc"
            className="inline-flex items-center gap-2 border border-zinc-500 hover:border-white text-zinc-300 hover:text-white font-medium px-8 py-4 rounded-full transition-all duration-200"
          >
            {hero.secondaryButton}
          </Link>
        </div>
      </div>
    </section>
  )
}