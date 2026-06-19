export interface GalleryPhoto {
  url: string
  title?: string
  description?: string
}

export interface MemberGallery {
  name: string          // e.g. "Landscapes"
  description?: string
  coverPhoto?: string
  photos: GalleryPhoto[]
}

export interface Member {
  slug: string
  name: string
  bio: string
  profilePhoto: string
  featured: boolean
  galleries: MemberGallery[]     // multi-gallery (primary)
  galleryPhotos: GalleryPhoto[]  // legacy flat array — fallback
  website?: string
  instagram?: string
  twitter?: string
  joinedYear?: number
  specialties?: string[]
}

export interface ShowcasePhoto {
  url: string
  title?: string
  photographer?: string
  photographerSlug?: string
  description?: string
}

export interface Showcase {
  slug: string
  month: string
  year: number
  theme: string
  description: string
  featuredImage: string
  photos: ShowcasePhoto[]
}

export interface Tutorial {
  slug: string
  title: string
  author: string
  date: string
  featuredImage: string
  excerpt: string
  difficulty?: string
  readTime?: string
  tags: string[]
  content?: string
}

export interface NewsItem {
  slug: string
  title: string
  date: string
  featuredImage: string
  excerpt: string
  category?: string
  content?: string
}
