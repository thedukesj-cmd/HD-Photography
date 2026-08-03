"use client"

import Masonry from "react-masonry-css"

type MasonryGalleryProps = {
  children: React.ReactNode
  columns?: 2 | 3 | 4
  className?: string
}

export function MasonryGallery({
  children,
  columns = 3,
  className = "",
}: MasonryGalleryProps) {
  const breakpointColumns = {
    default: columns,
    1024: Math.min(columns, 3),
    640: Math.min(columns, 2),
    0: 1,
  }

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className={`flex -ml-3 w-auto ${className}`}
      columnClassName="pl-3 bg-clip-padding"
    >
      {children}
    </Masonry>
  )
}