import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  User,
} from "lucide-react"

import {
  getAllTutorials,
  getTutorialWithHtml,
} from "@/lib/content"
import { cn } from "@/lib/utils"
import { ArticleDetailText } from "@/components/article-detail-text"

interface Props {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  const tutorials = getAllTutorials()

  if (tutorials.length === 0) {
    return [{ slug: "__empty__" }]
  }

  return tutorials.map((tutorial) => ({
    slug: tutorial.slug,
  }))
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params
  const tutorial = await getTutorialWithHtml(slug)

  if (!tutorial) return {}

  return {
    title: tutorial.title,
    description: tutorial.excerpt,
    openGraph: {
      title: tutorial.title,
      description: tutorial.excerpt,
      images: tutorial.featuredImage
        ? [{ url: tutorial.featuredImage }]
        : [],
    },
  }
}

const difficultyColor: Record<string, string> = {
  Beginner:
    "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Intermediate:
    "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Advanced:
    "bg-red-500/20 text-red-400 border-red-500/30",
}

export default async function ArticlePage({
  params,
}: Props) {
  const { slug } = await params
  const tutorial = await getTutorialWithHtml(slug)

  if (!tutorial) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <section className="relative flex min-h-[420px] items-end overflow-hidden md:min-h-[500px]">
        {tutorial.featuredImage && (
          <div className="absolute inset-0">
            <Image
              src={tutorial.featuredImage}
              alt={tutorial.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/55 to-zinc-950/10" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
          <Link
            href="/tutorials"
            className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-amber-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <ArticleDetailText type="back" />
          </Link>

          {tutorial.difficulty && (
            <div>
              <span
                className={cn(
                  "mb-4 inline-block rounded-full border px-3 py-1 text-xs font-medium",
                  difficultyColor[tutorial.difficulty] ||
                    difficultyColor.Beginner
                )}
              >
                <ArticleDetailText
                  type="difficulty"
                  difficulty={tutorial.difficulty}
                />
              </span>
            </div>
          )}

          <h1 className="font-playfair text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {tutorial.title}
          </h1>
        </div>
      </section>

      <div className="border-b border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {tutorial.author}
            </span>

            {tutorial.date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <ArticleDetailText
                  type="date"
                  date={tutorial.date}
                />
              </span>
            )}

            {tutorial.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {tutorial.readTime}
              </span>
            )}
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        {tutorial.excerpt && (
          <p className="mb-10 text-xl italic leading-relaxed text-zinc-400">
            {tutorial.excerpt}
          </p>
        )}

        <div
          className="prose-photography"
          dangerouslySetInnerHTML={{
            __html: tutorial.contentHtml || "",
          }}
        />

        {tutorial.tags.length > 0 && (
          <div className="mt-12 border-t border-zinc-800 pt-8">
            <div className="flex flex-wrap items-center gap-3">
              <Tag className="h-4 w-4 text-zinc-500" />

              {tutorial.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}