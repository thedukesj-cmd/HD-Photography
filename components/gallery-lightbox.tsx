"use client"

import { useState } from "react"
import Lightbox from "yet-another-react-lightbox"
import Captions from "yet-another-react-lightbox/plugins/captions"
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/captions.css"
import type { GalleryPhoto } from "@/types"
import { cn } from "@/lib/utils"

interface GalleryLightboxProps {
  photos: GalleryPhoto[]
  columns?: 2 | 3 | 4
}

export function GalleryLightbox({ photos, columns = 3 }: GalleryLightboxProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  }[columns]

  return (
    <>
      <div className={cn("grid gap-3", gridCols)}>
        {photos.map((photo, i) => (
          <button
            key={i}
            className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
            onClick={() => { setIndex(i); setOpen(true) }}
            aria-label={photo.title || `Photo ${i + 1}`}
          >
           <img
            	 src={encodeURI(photo.url)}
 		 alt={photo.title || `Gallery photo ${i + 1}`}
 		 className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
 		 loading="lazy"
	/>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex flex-col justify-end p-3">
              {photo.title && (
                <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 transition-transform">
                  {photo.title}
                </span>
              )}
              {photo.description && (
                <span className="text-zinc-300 text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                  {photo.description}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={photos.map(p => ({
          src: encodeURI(p.url),
          title: p.title,
          description: p.description,
        }))}
        plugins={[Captions]}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.95)" },
        }}
        captions={{ showToggle: true, descriptionTextAlign: "center" }}
      />
    </>
  )
}
