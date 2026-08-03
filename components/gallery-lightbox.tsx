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

export function GalleryLightbox({
  photos,
  columns = 3,
}: GalleryLightboxProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  return (
    <>
      <div
        className={cn(
          "columns-1 gap-3",
          columns === 2 && "sm:columns-2",
          columns === 3 && "sm:columns-2 lg:columns-3",
          columns === 4 && "columns-2 sm:columns-3 lg:columns-4"
        )}
      >
        {photos.map((photo, i) => (
          <button
            key={i}
            type="button"
            className="relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-lg group cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
            onClick={() => {
              setIndex(i)
              setOpen(true)
            }}
            aria-label={photo.title || `Photo ${i + 1}`}
          >
            <img
              src={photo.url}
              alt={photo.title || `Gallery photo ${i + 1}`}
              className="block h-auto w-full transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            <div className="absolute inset-0 flex flex-col justify-end bg-black/0 p-3 transition-all duration-300 group-hover:bg-black/40">
              {photo.title && (
                <span className="translate-y-2 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {photo.title}
                </span>
              )}

              {photo.description && (
                <span className="mt-0.5 line-clamp-2 text-xs text-zinc-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
        slides={photos.map((photo) => ({
          src: photo.url,
          title: photo.title,
          description: photo.description,
        }))}
        plugins={[Captions]}
        styles={{
          container: {
            backgroundColor: "rgba(0,0,0,0.95)",
          },
        }}
        captions={{
          showToggle: true,
          descriptionTextAlign: "center",
        }}
      />
    </>
  )
}