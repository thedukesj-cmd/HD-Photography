"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import type { Showcase } from "@/types"
import { GalleryLightbox } from "@/components/gallery-lightbox"
import { ShowcaseDetailText } from "@/components/showcase-detail-text"
import { ShowcaseViewCounter } from "@/components/showcase-view-counter"
import { useLanguage } from "@/components/language-provider"

type ShowcaseDetailContentProps = {
  showcase: Showcase
  descriptionHtml?: string
}

export function ShowcaseDetailContent({
  showcase,
  descriptionHtml,
}: ShowcaseDetailContentProps) {
  const { language } = useLanguage()

  const displayTitle =
    language === "vi"
      ? showcase.titleVi || showcase.title
      : showcase.title

  const displayTheme =
    language === "vi"
      ? showcase.themeVi || showcase.theme
      : showcase.theme

  const displayDescription =
    language === "vi"
      ? showcase.descriptionVi || showcase.description
      : showcase.description

  const showTheme =
    displayTheme &&
    displayTheme.trim().toLowerCase() !==
      displayTitle.trim().toLowerCase()

  /*
   * If a Vietnamese description exists, use it as plain text.
   * Otherwise fall back to the existing Markdown body.
   */
  const useDescriptionHtml =
    language === "en"
      ? descriptionHtml
      : !showcase.descriptionVi
        ? descriptionHtml
        : ""

  const lightboxPhotos = showcase.photos.map((photo) => ({
    url: photo.url,
    title: photo.title,
    description: `${photo.photographer || ""}${
      photo.description
        ? `${photo.photographer ? " — " : ""}${photo.description}`
        : ""
    }`,
  }))

  const photographers = Array.from(
    new Set(
      showcase.photos
        .map((photo) => photo.photographer)
        .filter(
          (name): name is string =>
            Boolean(name)
        )
    )
  )

  return (
    <div className="min-h-screen bg-zinc-950">
      <section className="relative min-h-[520px] overflow-hidden">
        {showcase.featuredImage && (
          <Image
            src={showcase.featuredImage}
            alt={displayTitle}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/45 to-black/20" />

        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
          <Link
            href="/showcase"
            className="mb-8 inline-flex w-fit items-center gap-2 text-sm text-zinc-300 transition-colors hover:text-amber-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <ShowcaseDetailText type="back" />
          </Link>

          {/* Date + View Counter */}
          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            {showcase.date && (
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                <ShowcaseDetailText
                  type="date"
                  date={showcase.date}
                />
              </span>
            )}

            <ShowcaseViewCounter
              slug={showcase.slug}
            />
          </div>

          <h1 className="max-w-4xl font-playfair text-5xl font-bold text-white md:text-7xl">
            {displayTitle}
          </h1>

          {showTheme && (
            <p className="mt-4 max-w-3xl text-lg text-zinc-300 md:text-xl">
              {displayTheme}
            </p>
          )}
        </div>
      </section>

      {(displayDescription ||
        useDescriptionHtml) && (
        <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          {useDescriptionHtml ? (
            <div
              className="prose-photography text-lg"
              dangerouslySetInnerHTML={{
                __html: useDescriptionHtml,
              }}
            />
          ) : (
            <p className="text-lg leading-relaxed text-zinc-400">
              {displayDescription}
            </p>
          )}
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <h2 className="mb-8 font-playfair text-3xl font-bold text-white">
          <ShowcaseDetailText
            type="photos"
            count={showcase.photos.length}
          />
        </h2>

        <GalleryLightbox
          photos={lightboxPhotos}
          columns={3}
        />

        {photographers.length > 0 && (
          <div className="mt-12 border-t border-zinc-800 pt-8">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              <ShowcaseDetailText type="photographers" />
            </h3>

            <div className="flex flex-wrap gap-4">
              {photographers.map((name) => {
                const photo =
                  showcase.photos.find(
                    (item) =>
                      item.photographer ===
                      name
                  )

                return photo?.photographerSlug ? (
                  <Link
                    key={name}
                    href={`/members/${photo.photographerSlug}`}
                    className="text-sm text-zinc-400 transition-colors hover:text-amber-400"
                  >
                    {name}
                  </Link>
                ) : (
                  <span
                    key={name}
                    className="text-sm text-zinc-400"
                  >
                    {name}
                  </span>
                )
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}