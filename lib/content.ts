import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import remarkGfm from "remark-gfm"
import remarkHtml from "remark-html"
import type {
  Member,
  MemberGallery,
  GalleryPhoto,
  Showcase,
  Tutorial,
  NewsItem,
} from "@/types"

const CONTENT_DIR = path.join(process.cwd(), "content")

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(markdown)

  return result.toString()
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
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
      const { data } = matter(
        fs.readFileSync(path.join(dir, f), "utf-8")
      )

      return parseMember(slug, data)
    })
    .sort((a, b) => {
      if ((a as any).owner && !(b as any).owner) return -1
      if (!(a as any).owner && (b as any).owner) return 1
      return a.name.localeCompare(b.name)
    })
}

function parseMember(slug: string, data: any): Member {
  const folder = data.folder || data.photoFolder || ""

  let autoGalleries: MemberGallery[] = []

  if (folder) {
    try {
      const relativeFolder = folder.replace(/^\/uploads\//, "")
      const memberFolderPath = path.join(
        process.cwd(),
        "public",
        "uploads",
        relativeFolder
      )

      if (fs.existsSync(memberFolderPath)) {
        autoGalleries = fs
          .readdirSync(memberFolderPath)
          .filter(categoryName =>
            fs
              .statSync(path.join(memberFolderPath, categoryName))
              .isDirectory()
          )
          .sort()
          .flatMap(categoryName => {
            const categoryPath = path.join(
              memberFolderPath,
              categoryName
            )

            return fs
              .readdirSync(categoryPath)
              .filter(albumName =>
                fs
                  .statSync(path.join(categoryPath, albumName))
                  .isDirectory()
              )
              .sort()
              .map(albumName => {
                const albumPath = path.join(
                  categoryPath,
                  albumName
                )

                const photos = fs
                  .readdirSync(albumPath)
                  .filter(file =>
                    /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
                  )
                  .sort()
                  .map(file => ({
                    url: `${folder}/${categoryName}/${albumName}/${file}`,
                    title: file.replace(/\.[^/.]+$/, ""),
                  }))

                return {
                  name: `${categoryName} / ${albumName}`,
                  description: categoryName,
                  coverPhoto: photos[0]?.url || "",
                  photos,
                }
              })
              .filter(gallery => gallery.photos.length > 0)
          })
      }
    } catch (error) {
      autoGalleries = []
    }
  }

  let manualGalleries: MemberGallery[] = []

  if (data.galleries && Array.isArray(data.galleries)) {
    manualGalleries = data.galleries.map((g: any) => ({
      name: g.name || "Gallery",
      description: g.description || "",
      coverPhoto: g.coverPhoto || "",
      photos: (g.photos || []).map(
        (p: any): GalleryPhoto => ({
          url: typeof p === "string" ? p : p.url || "",
          title:
            typeof p === "string"
              ? undefined
              : p.title,
          description:
            typeof p === "string"
              ? undefined
              : p.description,
        })
      ),
    }))
  } else if (
    data.galleryPhotos &&
    Array.isArray(data.galleryPhotos)
  ) {
    manualGalleries = [
      {
        name: "Portfolio",
        photos: data.galleryPhotos.map(
          (p: any): GalleryPhoto => ({
            url: typeof p === "string" ? p : p.url || "",
            title:
              typeof p === "string"
                ? undefined
                : p.title,
            description:
              typeof p === "string"
                ? undefined
                : p.description,
          })
        ),
      },
    ]
  }

  const galleries =
    autoGalleries.length > 0
      ? autoGalleries
      : manualGalleries

  return {
    owner: data.owner || false,
    slug,

    name:
      typeof data.name === "string"
        ? data.name
        : data.name?.en || "",

    nameVi:
      typeof data.name === "object"
        ? data.name.vi || data.name.en || ""
        : data.name || "",

    tagline:
      typeof data.tagline === "string"
        ? data.tagline
        : data.tagline?.en || "",

    taglineVi:
      typeof data.tagline === "object"
        ? data.tagline.vi ||
          data.tagline.en ||
          ""
        : data.tagline || "",

    bio:
      typeof data.bio === "string"
        ? data.bio
        : data.bio?.en || "",

    bioVi:
      typeof data.bio === "object"
        ? data.bio.vi || data.bio.en || ""
        : data.bio || "",

    profilePhoto:
      data.profilePhoto ||
      data.profile_photo ||
      galleries[0]?.coverPhoto ||
      "",

    featured: data.featured || false,
    galleries,

    galleryPhotos: galleries.flatMap(
      g => g.photos || []
    ),

    website: data.website,
    instagram: data.instagram,
    twitter: data.twitter,
    joinedYear:
      data.joinedYear || data.joined_year,
    specialties: data.specialties || [],
  }
}

export function getFeaturedMember():
  | Member
  | undefined {
  return getAllMembers().find(m => m.featured)
}

export async function getMemberWithHtml(
  slug: string
) {
  const file = path.join(
    CONTENT_DIR,
    "members",
    `${slug}.md`
  )

  if (!fs.existsSync(file)) return null

  const { data, content } = matter(
    fs.readFileSync(file, "utf-8")
  )

  const member = parseMember(slug, data)

  return {
    ...member,
    bioHtml: await markdownToHtml(content),
  }
}

// ─── Showcase ─────────────────────────────────────────────────────────────────
// V2.1
//
// Showcases may use arbitrary names.
// They are sorted newest-first using the frontmatter "date" field.
//
// Markdown files may be stored directly in:
//   content/showcase/example.md
//
// or inside nested folders.
//
// Photos are automatically discovered from the folder specified by:
//   folder: /uploads/showcase/example
//
// The old year/month grouping is no longer required.

function getShowcaseFiles(): {
  path: string
  slug: string
}[] {
  const dir = path.join(
    CONTENT_DIR,
    "showcase"
  )

  if (!fs.existsSync(dir)) return []

  const files: {
    path: string
    slug: string
  }[] = []

  function scan(
    currentDir: string,
    prefix = ""
  ) {
    fs.readdirSync(currentDir).forEach(
      entry => {
        const full = path.join(
          currentDir,
          entry
        )

        if (fs.statSync(full).isDirectory()) {
          scan(
            full,
            prefix
              ? `${prefix}-${entry}`
              : entry
          )
        } else if (entry.endsWith(".md")) {
          const base = entry.replace(
            /\.md$/,
            ""
          )

          const slug = prefix
            ? `${prefix}-${base}`
            : base

          files.push({
            path: full,
            slug,
          })
        }
      }
    )
  }

  scan(dir)

  return files
}

export function getAllShowcases(): Showcase[] {
  return getShowcaseFiles()
    .map(({ path: filePath, slug }) => {
      const { data } = matter(
        fs.readFileSync(
          filePath,
          "utf-8"
        )
      )

      return parseShowcase(
        slug,
        data
      )
    })
    .sort((a, b) => {
      const dateA = new Date(
        a.date
      ).getTime()

      const dateB = new Date(
        b.date
      ).getTime()

      if (
        Number.isNaN(dateA) &&
        Number.isNaN(dateB)
      ) {
        return 0
      }

      if (Number.isNaN(dateA)) {
        return 1
      }

      if (Number.isNaN(dateB)) {
        return -1
      }

      return dateB - dateA
    })
}

function parseShowcase(
  slug: string,
  data: any
): Showcase {
  const folder =
    data.folder ||
    data.photoFolder ||
    ""

  let autoPhotos: any[] = []

  if (folder) {
    try {
      const relativeFolder =
        folder.replace(
          /^\/uploads\//,
          ""
        )

      const folderPath = path.join(
        process.cwd(),
        "public",
        "uploads",
        relativeFolder
      )

      if (
        fs.existsSync(folderPath)
      ) {
        autoPhotos = fs
          .readdirSync(folderPath)
          .filter(file =>
            /\.(jpg|jpeg|png|webp|gif)$/i.test(
              file
            )
          )
          .sort()
          .map(file => ({
            url: `${folder}/${file}`,
            title: file.replace(
              /\.[^/.]+$/,
              ""
            ),
          }))
      }
    } catch (error) {
      autoPhotos = []
    }
  }

  const manualPhotos = (
    data.photos || []
  ).map((p: any) => ({
    url:
      typeof p === "string"
        ? p
        : p.url || "",

    title:
      typeof p === "string"
        ? undefined
        : p.title,

    photographer:
      typeof p === "string"
        ? undefined
        : p.photographer,

    photographerSlug:
      typeof p === "string"
        ? undefined
        : p.photographerSlug,

    description:
      typeof p === "string"
        ? undefined
        : p.description,
  }))

  const photos =
    autoPhotos.length > 0
      ? autoPhotos
      : manualPhotos

  return {
    slug,

    title:
      data.title ||
      data.name ||
      slug,

    date:
      data.date
        ? String(data.date)
        : "",

    theme:
      data.theme || "",

    description:
      data.description || "",

    featuredImage:
     data.featuredImage ||
     data.featured_image ||
      photos[0]?.url ||
    "",

    photos,
  }
}

export function getLatestShowcase():
  | Showcase
  | undefined {
  return getAllShowcases()[0]
}

export async function getShowcaseWithHtml(
  slug: string
) {
  const match =
    getShowcaseFiles().find(
      file => file.slug === slug
    )

  if (!match) return null

  const { data, content } = matter(
    fs.readFileSync(
      match.path,
      "utf-8"
    )
  )

  const showcase = parseShowcase(
    slug,
    data
  )

  return {
    ...showcase,
    descriptionHtml:
      await markdownToHtml(content),
  }
}

// ─── Tutorials ────────────────────────────────────────────────────────────────

export function getAllTutorials(): Tutorial[] {
  const dir = path.join(
    CONTENT_DIR,
    "tutorials"
  )

  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith(".md"))
    .map(f => {
      const slug = f.replace(
        ".md",
        ""
      )

      const { data } = matter(
        fs.readFileSync(
          path.join(dir, f),
          "utf-8"
        )
      )

      return parseTutorial(
        slug,
        data
      )
    })
    .sort(
      (a, b) =>
        new Date(
          b.date
        ).getTime() -
        new Date(
          a.date
        ).getTime()
    )
}

function parseTutorial(
  slug: string,
  data: any
): Tutorial {
  return {
    slug,
    title: data.title || "",
    author:
      data.author ||
      "Aperture Club",

    date: data.date
      ? String(data.date)
      : new Date().toISOString(),

    featuredImage:
      data.featuredImage ||
      data.featured_image ||
      "",

    excerpt: data.excerpt || "",
    difficulty: data.difficulty,

    readTime:
      data.readTime ||
      data.read_time,

    tags: data.tags || [],
    content: data.content,
  }
}

export function getLatestTutorials(
  n = 3
): Tutorial[] {
  return getAllTutorials().slice(
    0,
    n
  )
}

export async function getTutorialWithHtml(
  slug: string
) {
  const file = path.join(
    CONTENT_DIR,
    "tutorials",
    `${slug}.md`
  )

  if (!fs.existsSync(file)) {
    return null
  }

  const { data, content } = matter(
    fs.readFileSync(
      file,
      "utf-8"
    )
  )

  const tutorial =
    parseTutorial(
      slug,
      data
    )

  return {
    ...tutorial,
    contentHtml:
      await markdownToHtml(content),
  }
}

// ─── News ─────────────────────────────────────────────────────────────────────

export function getAllNews(): NewsItem[] {
  const dir = path.join(
    CONTENT_DIR,
    "news"
  )

  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith(".md"))
    .map(f => {
      const slug = f.replace(
        ".md",
        ""
      )

      const { data } = matter(
        fs.readFileSync(
          path.join(dir, f),
          "utf-8"
        )
      )

      return parseNews(
        slug,
        data
      )
    })
    .sort(
      (a, b) =>
        new Date(
          b.date
        ).getTime() -
        new Date(
          a.date
        ).getTime()
    )
}

function parseNews(
  slug: string,
  data: any
): NewsItem {
  return {
    slug,
    title: data.title || "",

    date: data.date
      ? String(data.date)
      : new Date().toISOString(),

    featuredImage:
      data.featuredImage ||
      data.featured_image ||
      "",

    excerpt: data.excerpt || "",
    category: data.category,
    content: data.content,
  }
}

export function getLatestNews(
  n = 3
): NewsItem[] {
  return getAllNews().slice(
    0,
    n
  )
}

export async function getNewsWithHtml(
  slug: string
) {
  const file = path.join(
    CONTENT_DIR,
    "news",
    `${slug}.md`
  )

  if (!fs.existsSync(file)) {
    return null
  }

  const { data, content } = matter(
    fs.readFileSync(
      file,
      "utf-8"
    )
  )

  const news =
    parseNews(
      slug,
      data
    )

  return {
    ...news,
    contentHtml:
      await markdownToHtml(content),
  }
}