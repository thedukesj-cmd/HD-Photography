"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export function HomeCTA() {
  const { translations, language } = useLanguage()
  const text = translations.homeCTA

  const photographerName =
    language === "vi"
      ? "Nguyễn Hồng Đức"
      : "Hong-Duc Nguyen"

  return (
    <section className="relative overflow-hidden border-t border-zinc-800/60 py-24 md:py-28">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          className="object-cover opacity-25"
          loading="lazy"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-zinc-950/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-playfair text-4xl font-bold leading-tight text-white md:text-5xl">
          {text.title}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          {text.description}
        </p>

        <div className="mt-9">
          <Button
            href="/showcase"
            size="lg"
            className="gap-2 font-bold"
          >
            {text.button}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        <p className="mt-8 font-playfair text-lg italic text-zinc-500">
          — {photographerName}
        </p>
      </div>
    </section>
  )
}