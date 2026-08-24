import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  getAllTutorials,
  getTutorialWithHtml,
} from "@/lib/content"

import { ArticleDetailContent } from "@/components/article-detail-content"

interface Props {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  const tutorials =
    getAllTutorials()

  if (tutorials.length === 0) {
    return [
      {
        slug: "__empty__",
      },
    ]
  }

  return tutorials.map(
    (tutorial) => ({
      slug: tutorial.slug,
    })
  )
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params

  const tutorial =
    await getTutorialWithHtml(
      slug
    )

  if (!tutorial) {
    return {}
  }

  return {
    title: tutorial.title,

    description:
      tutorial.excerpt,

    openGraph: {
      title:
        tutorial.title,

      description:
        tutorial.excerpt,

      images:
        tutorial.featuredImage
          ? [
              {
                url:
                  tutorial.featuredImage,
              },
            ]
          : [],
    },
  }
}

export default async function ArticlePage({
  params,
}: Props) {
  const { slug } = await params

  const tutorial =
    await getTutorialWithHtml(
      slug
    )

  if (!tutorial) {
    notFound()
  }

  return (
    <ArticleDetailContent
      tutorial={tutorial}
    />
  )
}