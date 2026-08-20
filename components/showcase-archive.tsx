"use client"

import { ShowcaseCard } from "@/components/showcase-card"
import { useLanguage } from "@/components/language-provider"
import type { Showcase } from "@/types"

type ShowcaseArchiveProps = {
  showcases: Showcase[]
}

export function ShowcaseArchive({
  showcases,
}: ShowcaseArchiveProps) {
  const { language } = useLanguage()

  return (
    <section className="mt-14">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="font-playfair text-3xl text-zinc-300 font-bold whitespace-nowrap">
          {language === "vi"
            ? "Các Bộ Ảnh"
            : "Showcases"}
        </h2>

        <span className="h-px flex-1 bg-zinc-800" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {showcases.map((showcase) => (
          <ShowcaseCard
            key={showcase.slug}
            showcase={showcase}
          />
        ))}
      </div>
    </section>
  )
}