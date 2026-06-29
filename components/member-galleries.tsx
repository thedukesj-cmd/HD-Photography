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

function photoLabel(count: number) {
  return count === 1 ? "1 photograph" : `${count} photographs`
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
      <div className="mb-16 space-y-16">
        <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest">
          Portfolio Collections
        </p>

        {Object.entries(grouped).map(([category, albums]) => {
          const banner = albums[0]?.gallery.coverPhoto

          return (
            <section key={category} className="space-y-6">
              <div className="flex items-center justify-between mb-5">
    <h3 className="font-playfair text-3xl text-white font-bold">
        {category}
    </h3>

    <span className="text-zinc-500 text-sm">
        {albums.length} {albums.length === 1 ? "album" : "albums"}
    </span>
</div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {albums.map(({ gallery, index, album }) => (
                  <button
                    key={gallery.name}
                    onClick={() => {
  			setActive(index)
 			 setTimeout(() => {
    			document.getElementById("active-gallery")?.scrollIntoView({ behavior: "smooth" })
  			}, 50)
			}}
                    className={cn(
                      "group text-left overflow-hidden rounded-xl border transition-all bg-zinc-900/40",
                      index === active
                        ? "border-amber-500"
                        : "border-zinc-800 hover:border-amber-500/60"
                    )}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                      {gallery.coverPhoto ? (
                        <img
                          src={gallery.coverPhoto}
                          alt={album}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600">
                          No cover
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors" />
                    </div>

                    <div className="p-4">
                      <h4 className="text-white font-semibold text-lg">{album}</h4>
                      <p className="text-zinc-500 text-sm mt-1">
                        {photoLabel(gallery.photos.length)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <div id="active-gallery" className="mb-6 scroll-mt-24">
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