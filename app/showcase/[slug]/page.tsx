import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  getAllShowcases,
  getShowcaseWithHtml,
} from "@/lib/content"

import { ShowcaseDetailContent } from "@/components/showcase-detail-content"

interface Props {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getAllShowcases().map((showcase) => ({
    slug: showcase.slug,
  }))
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params
  const showcase =
    await getShowcaseWithHtml(slug)

  if (!showcase) return {}

  return {
    title: showcase.title,
    description: showcase.description,

    openGraph: {
      title: showcase.title,
      description: showcase.description,

      images: showcase.featuredImage
        ? [
            {
              url: showcase.featuredImage,
            },
          ]
        : [],
    },
  }
}

export default async function ShowcasePage({
  params,
}: Props) {
  const { slug } = await params

  const showcase =
    await getShowcaseWithHtml(slug)

  if (!showcase) {
    notFound()
  }

  return (
    <ShowcaseDetailContent
      showcase={showcase}
      descriptionHtml={
        showcase.descriptionHtml
      }
    />
  )
}