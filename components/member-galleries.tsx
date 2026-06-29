"use client"

import { useState } from "react"
import { GalleryLightbox } from "@/components/gallery-lightbox"
import type { MemberGallery } from "@/types"
import { cn } from "@/lib/utils"

interface Props {
  galleries: MemberGallery[]
}

function splitGalleryName(name: string) {
  const parts = name.split("/").map(p => p.trim())
  return {
    category: parts[0] || "Gallery",
    album: parts[1] || parts[0] || "Gallery",
  }
}

export function MemberGalleries({ galleries }: Props) {
  const [active, setActive] = useState(0)

  if (!galleries || galleries.length === 0) return null

  const grouped = galleries.reduce<Record<string, { gallery: MemberGallery; index: number; album: string }[]>>(
    (acc, gallery, index) => {
      const { category, album } = splitGalleryName(gallery.name)
      acc[category] = acc[category] || []
      acc[category].push({ gallery, index, album })
      return acc
    },
    {}
  )

  const current = galleries[active]
  const currentParts = splitGalleryName(current.name)

  return (
    <div>
      <div className="mb-12 space-y-12">
        <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest">
          Portfolio Collections
        </p>

        {Object.entries(grouped).map(([category, albums]) => (
          <div key={category}>
            <h3 className="font-playfair text-3xl text-white font-bold mb-5">
              {category}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {albums.map(({ gallery, index, album }) => (
                <button
                  key={gallery.name}
                  onClick={() => setActive(index)}
                  className={cn(
                    "group text-left overflow-hidden rounded-xl border transition-all bg-zinc-900/40",
                    index === active
                      ? "border-amber-500"
                      : "border-zinc-800 hover:border-amber-500/60"
                  )}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                    {gallery.coverPhoto ? (
                      <img
                        src={gallery.coverPhoto}
                        alt={album}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600">
                        No cover
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h4 className="text-white font-semibold text-lg">{album}</h4>
                    <p className="text-zinc-500 text-sm mt-1">
                      {gallery.photos.length} photographs
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <p className="text-amber-400 text-xs uppercase tracking-widest mb-2">
          {currentParts.category}
        </p>
        <h2 className="font-playfair text-4xl text-white font-bold">
          {currentParts.album}
        </h2>
      </div>

      <GalleryLightbox
        photos={current.photos.map(p => ({
          url: p.url,
          title: p.title,
          description: p.description,
        }))}
        columns={3}
      />
    </div>
  )
}