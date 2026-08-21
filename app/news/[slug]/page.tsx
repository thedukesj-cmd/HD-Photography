import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar } from "lucide-react"

import {
  getAllNews,
  getNewsWithHtml,
} from "@/lib/content"
import { NewsDetailText } from "@/components/news-detail-text"

interface Props {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getAllNews().map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params
  const item = await getNewsWithHtml(slug)

  if (!item) return {}

  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: item.featuredImage
        ? [{ url: item.featuredImage }]
        : [],
    },
  }
}

export default async function NewsItemPage({
  params,
}: Props) {
  const { slug } = await params
  const item = await getNewsWithHtml(slug)

  if (!item) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <section className="relative flex min-h-[420px] items-end overflow-hidden md:min-h-[500px]">
        {item.featuredImage && (
          <div className="absolute inset-0">
            <Image
              src={item.featuredImage}
              alt={item.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/10" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-amber-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <NewsDetailText type="back" />
          </Link>

          {item.category && (
            <div>
              <span className="mb-4 inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-400">
                {item.category}
              </span>
            </div>
          )}

          <h1 className="font-playfair text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {item.title}
          </h1>

          {item.date && (
            <div className="mt-4 flex items-center gap-1.5 text-sm text-zinc-400">
              <Calendar className="h-3.5 w-3.5" />
              <NewsDetailText
                type="date"
                date={item.date}
              />
            </div>
          )}
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        {item.excerpt && (
          <p className="mb-10 text-xl italic leading-relaxed text-zinc-400">
            {item.excerpt}
          </p>
        )}

        <div
          className="prose-photography"
          dangerouslySetInnerHTML={{
            __html: item.contentHtml || "",
          }}
        />
      </article>
    </div>
  )
}