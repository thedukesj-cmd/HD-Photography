"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export function HomeCTA() {
  const { translations } = useLanguage()
  const text = translations.homeCTA

  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          className="object-cover opacity-30"
          loading="lazy"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-6 font-playfair text-4xl font-bold text-white md:text-5xl">
          {text.title}
        </h2>

        <p className="mb-10 text-lg leading-relaxed text-zinc-400">
          {text.description}
        </p>

        <Button
          href="/showcase"
          size="lg"
          className="gap-2 font-bold"
        >
          {text.button}
          <ArrowRight className="h-5 w-5" />
        </Button>

        <p className="mt-8 font-playfair text-lg italic text-zinc-500">
          — Hong-Duc Nguyen
        </p>
      </div>
    </section>
  )
}