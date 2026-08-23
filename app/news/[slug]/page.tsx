import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  getAllNews,
  getNewsWithHtml,
} from "@/lib/content"

import { NewsDetailContent } from "@/components/news-detail-content"

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
    <NewsDetailContent
      title={item.title}
      titleVi={item.titleVi}
      date={item.date}
      featuredImage={item.featuredImage}
      excerpt={item.excerpt}
      excerptVi={item.excerptVi}
      category={item.category}
      categoryVi={item.categoryVi}
      contentHtml={item.contentHtml}
      contentHtmlVi={item.contentHtmlVi}
    />
  )
}