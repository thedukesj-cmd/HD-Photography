"use client"

import { useState } from "react"
import { GalleryLightbox } from "@/components/gallery-lightbox"
import type { MemberGallery } from "@/types"
import { cn } from "@/lib/utils"
import { Images } from "lucide-react"

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
      {/* Collection navigation */}
      {galleries.length > 1 && (
        <div className="mb-10 space-y-6">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest">
            Portfolio Collections
          </p>

          {Object.entries(grouped).map(([category, albums]) => (
            <div key={category}>
              <h3 className="text-zinc-300 text-sm font-semibold uppercase tracking-widest mb-3">
                {category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {albums.map(({ gallery, index, album }) => (
                  <button
                    key={gallery.name}
                    onClick={() => setActive(index)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm rounded-full border transition-colors",
                      index === active
                        ? "bg-amber-500 text-zinc-950 border-amber-500"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20"
                    )}
                  >
                    <Images className="h-4 w-4" />
                    {album}
                    <span className={cn(
                      "ml-1 text-xs",
                      index === active ? "text-zinc-800" : "text-zinc-500"
                    )}>
                      ({gallery.photos.length})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Active album title */}
      <div className="mb-6">
        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">
          {currentParts.category}
        </p>
        <h2 className="font-playfair text-3xl text-white font-bold">
          {currentParts.album}
        </h2>
      </div>

      {/* Lightbox grid */}
      {current.photos.length > 0 ? (
        <GalleryLightbox
          photos={current.photos.map(p => ({
            url: p.url,
            title: p.title,
            description: p.description,
          }))}
          columns={3}
        />
      ) : (
        <p className="text-zinc-600 italic text-sm py-12 text-center">No photos in this gallery yet.</p>
      )}
    </div>
  )
}