import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import remarkGfm from "remark-gfm"
import remarkHtml from "remark-html"
import type { Member, MemberGallery, GalleryPhoto, Showcase, Tutorial, NewsItem } from "@/types"

const CONTENT_DIR = path.join(process.cwd(), "content")

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(markdown)
  return result.toString()
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

// ─── Members ─────────────────────────────────────────────────────────────────

export function getAllMembers(): Member[] {
  const dir = path.join(CONTENT_DIR, "members")
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith(".md"))
    .map(f => {
      const slug = f.replace(".md", "")
      const { data } = matter(fs.readFileSync(path.join(dir, f), "utf-8"))
      return parseMember(slug, data)
    })
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
}

function parseMember(slug: string, data: any): Member {
  // Prefer new "galleries" field; fall back to legacy "galleryPhotos"
  let galleries: MemberGallery[] = []
  if (data.galleries && Array.isArray(data.galleries)) {
    galleries = data.galleries.map((g: any) => ({
      name: g.name || "Gallery",
      description: g.description || "",
      coverPhoto: g.coverPhoto || "",
      photos: (g.photos || []).map((p: any): GalleryPhoto => ({
        url: typeof p === "string" ? p : p.url || "",
        title: typeof p === "string" ? undefined : p.title,
        description: typeof p === "string" ? undefined : p.description,
      })),
    }))
  } else if (data.galleryPhotos && Array.isArray(data.galleryPhotos)) {
    // Wrap legacy flat array as a single "Portfolio" gallery
    galleries = [{
      name: "Portfolio",
      photos: data.galleryPhotos.map((p: any): GalleryPhoto => ({
        url: typeof p === "string" ? p : p.url || "",
        title: typeof p === "string" ? undefined : p.title,
        description: typeof p === "string" ? undefined : p.description,
      })),
    }]
  }

  return {
    slug,
    name: data.name || "",
    bio: data.bio || "",
    profilePhoto: data.profilePhoto || data.profile_photo || "",
    featured: data.featured || false,
    galleries,
    galleryPhotos: (data.galleryPhotos || []).map((p: any): GalleryPhoto => ({
      url: typeof p === "string" ? p : p.url || "",
    })),
    website: data.website,
    instagram: data.instagram,
    twitter: data.twitter,
    joinedYear: data.joinedYear || data.joined_year,
    specialties: data.specialties || [],
  }
}

export function getFeaturedMember(): Member | undefined {
  return getAllMembers().find(m => m.featured)
}

export async function getMemberWithHtml(slug: string) {
  const file = path.join(CONTENT_DIR, "members", `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const { data, content } = matter(fs.readFileSync(file, "utf-8"))
  const member = parseMember(slug, data)
  return { ...member, bioHtml: await markdownToHtml(content) }
}

// ─── Showcase ─────────────────────────────────────────────────────────────────
// Supports both flat content/showcase/YYYY-MM-name.md  AND
// nested content/showcase/YYYY/MM.md (new structure)

export function getAllShowcases(): Showcase[] {
  const dir = path.join(CONTENT_DIR, "showcase")
  if (!fs.existsSync(dir)) return []

  const files: { path: string; slug: string }[] = []

  function scan(dir: string, prefix = "") {
    fs.readdirSync(dir).forEach(entry => {
      const full = path.join(dir, entry)
      if (fs.statSync(full).isDirectory()) {
        scan(full, prefix ? `${prefix}-${entry}` : entry)
      } else if (entry.endsWith(".md")) {
        const base = entry.replace(".md", "")
        const slug = prefix ? `${prefix}-${base}` : base
        files.push({ path: full, slug })
      }
    })
  }
  scan(dir)

  return files
    .map(({ path: filePath, slug }) => {
      const { data } = matter(fs.readFileSync(filePath, "utf-8"))
      return parseShowcase(slug, data)
    })
    .sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year
      const months = ["January","February","March","April","May","June",
                      "July","August","September","October","November","December"]
      return months.indexOf(b.month) - months.indexOf(a.month)
    })
}

function parseShowcase(slug: string, data: any): Showcase {
  const folder = data.folder || data.photoFolder || ""

  let autoPhotos: any[] = []

  if (folder) {
    try {
      const relativeFolder = folder.replace(/^\/uploads\//, "")
      const folderPath = path.join(process.cwd(), "public", "uploads", relativeFolder)

      if (fs.existsSync(folderPath)) {
        autoPhotos = fs.readdirSync(folderPath)
          .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
          .sort()
          .map(file => ({
            url: `${folder}/${file}`,
            title: file.replace(/\.[^/.]+$/, ""),
          }))
      }
    } catch (error) {
      autoPhotos = []
    }
  }

  const manualPhotos = (data.photos || []).map((p: any) => ({
    url: typeof p === "string" ? p : p.url || "",
    title: typeof p === "string" ? undefined : p.title,
    photographer: typeof p === "string" ? undefined : p.photographer,
    photographerSlug: typeof p === "string" ? undefined : p.photographerSlug,
    description: typeof p === "string" ? undefined : p.description,
  }))

  const photos = autoPhotos.length > 0 ? autoPhotos : manualPhotos

  return {
    slug,
    month: data.month || "",
    year: data.year || new Date().getFullYear(),
    theme: data.theme || "",
    description: data.description || "",
    featuredImage: data.featuredImage || data.featured_image || photos[0]?.url || "",
    photos,
  }
}

export function getLatestShowcase(): Showcase | undefined {
  return getAllShowcases()[0]
}

export async function getShowcaseWithHtml(slug: string) {
  // Try direct flat path first, then traverse year subdirs
  const direct = path.join(CONTENT_DIR, "showcase", `${slug}.md`)
  let filePath = direct
  if (!fs.existsSync(direct)) {
    // slug might be e.g. "2025-june" for content/showcase/2025/june.md
    const parts = slug.split("-")
    const year = parts[0]
    const rest = parts.slice(1).join("-")
    const nested = path.join(CONTENT_DIR, "showcase", year, `${rest}.md`)
    if (fs.existsSync(nested)) filePath = nested
    else return null
  }
  const { data, content } = matter(fs.readFileSync(filePath, "utf-8"))
  const showcase = parseShowcase(slug, data)
  return { ...showcase, descriptionHtml: await markdownToHtml(content) }
}

// ─── Tutorials ────────────────────────────────────────────────────────────────

export function getAllTutorials(): Tutorial[] {
  const dir = path.join(CONTENT_DIR, "tutorials")
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith(".md"))
    .map(f => {
      const slug = f.replace(".md", "")
      const { data } = matter(fs.readFileSync(path.join(dir, f), "utf-8"))
      return parseTutorial(slug, data)
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function parseTutorial(slug: string, data: any): Tutorial {
  return {
    slug,
    title: data.title || "",
    author: data.author || "Aperture Club",
    date: data.date ? String(data.date) : new Date().toISOString(),
    featuredImage: data.featuredImage || data.featured_image || "",
    excerpt: data.excerpt || "",
    difficulty: data.difficulty,
    readTime: data.readTime || data.read_time,
    tags: data.tags || [],
    content: data.content,
  }
}

export function getLatestTutorials(n = 3): Tutorial[] {
  return getAllTutorials().slice(0, n)
}

export async function getTutorialWithHtml(slug: string) {
  const file = path.join(CONTENT_DIR, "tutorials", `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const { data, content } = matter(fs.readFileSync(file, "utf-8"))
  const tutorial = parseTutorial(slug, data)
  return { ...tutorial, contentHtml: await markdownToHtml(content) }
}

// ─── News ─────────────────────────────────────────────────────────────────────

export function getAllNews(): NewsItem[] {
  const dir = path.join(CONTENT_DIR, "news")
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith(".md"))
    .map(f => {
      const slug = f.replace(".md", "")
      const { data } = matter(fs.readFileSync(path.join(dir, f), "utf-8"))
      return parseNews(slug, data)
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function parseNews(slug: string, data: any): NewsItem {
  return {
    slug,
    title: data.title || "",
    date: data.date ? String(data.date) : new Date().toISOString(),
    featuredImage: data.featuredImage || data.featured_image || "",
    excerpt: data.excerpt || "",
    category: data.category,
    content: data.content,
  }
}

export function getLatestNews(n = 3): NewsItem[] {
  return getAllNews().slice(0, n)
}

export async function getNewsWithHtml(slug: string) {
  const file = path.join(CONTENT_DIR, "news", `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const { data, content } = matter(fs.readFileSync(file, "utf-8"))
  const news = parseNews(slug, data)
  return { ...news, contentHtml: await markdownToHtml(content) }
}
