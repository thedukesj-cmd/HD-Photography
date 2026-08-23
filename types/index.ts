export interface GalleryPhoto {
  url: string
  title?: string
  description?: string
}

export interface MemberGallery {
  name: string
  description?: string
  coverPhoto?: string
  photos: GalleryPhoto[]
}

export interface Member {
  owner?: boolean
  slug: string
  name: string
  nameVi?: string
  tagline?: string
  taglineVi?: string
  bio: string
  bioVi?: string
  profilePhoto: string
  featured: boolean
  galleries: MemberGallery[]
  galleryPhotos: GalleryPhoto[]
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
  title: string
  date: string
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
  titleVi?: string

  date: string
  featuredImage: string

  excerpt: string
  excerptVi?: string

  category?: string
  categoryVi?: string

  content?: string
  contentVi?: string
}