"use client"

import { useState } from "react"

import { GalleryLightbox } from "@/components/gallery-lightbox"
import type { MemberGallery } from "@/types"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"

interface Props {
  galleries: MemberGallery[]
}

function splitGalleryName(name: string, fallback: string) {
  const parts = name.split("/").map((part) => part.trim())

  return {
    category: parts[0] || fallback,
    album: parts[1] || parts[0] || fallback,
  }
}

const viGalleryNames: Record<string, string> = {
  Flowers: "Hoa",
  Portrait: "Chân dung",
  Landscape: "Phong cảnh",
  Nature: "Thiên nhiên",
  Travel: "Du lịch",
  Orchids: "Hoa Lan",
  Roses: "Hoa Hồng",
  People: "Con người",
  Canada: "Canada",
  Vietnam: "Việt Nam",
  VietNam: "Việt Nam",
  Yosemite: "Yosemite",
}

export function MemberGalleries({ galleries }: Props) {
  const [active, setActive] = useState(0)
  const { language, translations } = useLanguage()
  const text = translations.memberGalleries

  if (!galleries || galleries.length === 0) return null

  const translateName = (name: string) =>
    language === "vi" ? viGalleryNames[name] ?? name : name

  const grouped = galleries.reduce<
    Record<
      string,
      {
        gallery: MemberGallery
        index: number
        album: string
      }[]
    >
  >((acc, gallery, index) => {
    const { category, album } = splitGalleryName(
      gallery.name,
      text.gallery
    )

    acc[category] = acc[category] || []
    acc[category].push({
      gallery,
      index,
      album,
    })

    return acc
  }, {})

  const current = galleries[active]

  const currentParts = splitGalleryName(
    current.name,
    text.gallery
  )

  return (
    <div>
      <p className="mb-12 text-xs font-semibold uppercase tracking-widest text-amber-400">
        {text.portfolioCollections}
      </p>

      <div className="space-y-16">
        {Object.entries(grouped).map(([category, albums]) => (
          <section key={category} className="space-y-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-playfair text-3xl font-bold text-white">
                {translateName(category)}
              </h3>

              <span className="text-sm text-zinc-500">
                {albums.length}{" "}
                {albums.length === 1 ? text.album : text.albums}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {albums.map(({ gallery, index, album }) => (
                <button
                  key={gallery.name}
                  onClick={() => {
                    setActive(index)

                    setTimeout(() => {
                      document
                        .getElementById("active-gallery")
                        ?.scrollIntoView({
                          behavior: "smooth",
                        })
                    }, 50)
                  }}
                  className={cn(
                    "group overflow-hidden rounded-xl border bg-zinc-900/40 text-left transition-all",
                    index === active
                      ? "border-amber-500"
                      : "border-zinc-800 hover:border-amber-500/60"
                  )}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                    {gallery.coverPhoto ? (
                      <img
                        src={gallery.coverPhoto}
                        alt={translateName(album)}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-zinc-600">
                        {language === "vi"
                          ? "Chưa có ảnh bìa"
                          : "No cover"}
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/25" />
                  </div>

                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-white">
                      {translateName(album)}
                    </h4>

                    <p className="mt-1 text-sm text-zinc-500">
                      {gallery.photos.length}{" "}
                      {gallery.photos.length === 1
                        ? text.photograph
                        : text.photographs}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div
        id="active-gallery"
        className="mb-6 mt-16 scroll-mt-24"
      >
        <p className="mb-2 text-xs uppercase tracking-widest text-amber-400">
          {translateName(currentParts.category)}
        </p>

        <h2 className="font-playfair text-4xl font-bold text-white">
          {translateName(currentParts.album)}
        </h2>
      </div>

      <GalleryLightbox
        photos={current.photos.map((photo) => ({
          url: photo.url,
          title: photo.title,
          description: photo.description,
        }))}
        columns={3}
      />
    </div>
  )
}