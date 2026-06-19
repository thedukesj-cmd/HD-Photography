"use client"

import { useState } from "react"
import { GalleryLightbox } from "@/components/gallery-lightbox"
import type { MemberGallery } from "@/types"
import { cn } from "@/lib/utils"
import { Images } from "lucide-react"

interface Props {
  galleries: MemberGallery[]
}

export function MemberGalleries({ galleries }: Props) {
  const [active, setActive] = useState(0)

  if (!galleries || galleries.length === 0) return null

  const current = galleries[active]

  return (
    <div>
      {/* Tab bar */}
      {galleries.length > 1 && (
        <div className="flex gap-1 mb-8 border-b border-zinc-800 overflow-x-auto pb-0">
          {galleries.map((g, i) => (
            <button
              key={g.name}
              onClick={() => setActive(i)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
                i === active
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-600"
              )}
            >
              <Images className="h-4 w-4" />
              {g.name}
              <span className="ml-1 text-xs text-zinc-600">({g.photos.length})</span>
            </button>
          ))}
        </div>
      )}

      {/* Gallery description */}
      {current.description && (
        <p className="text-zinc-400 text-sm mb-6 max-w-2xl">{current.description}</p>
      )}

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
