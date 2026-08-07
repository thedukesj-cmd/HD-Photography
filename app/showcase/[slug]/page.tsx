import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import {
  getAllShowcases,
  getShowcaseWithHtml,
} from "@/lib/content"
import { GalleryLightbox } from "@/components/gallery-lightbox"
import { ShowcaseDetailText } from "@/components/showcase-detail-text"

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
  const showcase = await getShowcaseWithHtml(slug)

  if (!showcase) return {}

  return {
    title: showcase.theme,
    description: showcase.description,
    openGraph: {
      images: [
        {
          url: showcase.featuredImage,
        },
      ],
    },
  }
}

export default async function ShowcasePage({ params }: Props) {
  const { slug } = await params
  const showcase = await getShowcaseWithHtml(slug)

  if (!showcase) {
    notFound()
  }

  const lightboxPhotos = showcase.photos.map((photo: any) => ({
    url: photo.url,
    title: photo.title,
    description: `${photo.photographer || ""}${
      photo.description ? ` — ${photo.description}` : ""
    }`,
  }))

  const photographers = Array.from(
    new Set(
      showcase.photos
        .map((photo: any) => photo.photographer)
        .filter(Boolean)
    )
  )

  return (
    <div className="min-h-screen bg-zinc-950">
      <section className="relative min-h-[520px] overflow-hidden">
        <Image
          src={showcase.featuredImage}
          alt={showcase.theme}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/45 to-black/20" />

        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
          <Link
            href="/showcase"
            className="mb-8 inline-flex w-fit items-center gap-2 text-sm text-zinc-300 transition-colors hover:text-amber-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <ShowcaseDetailText type="back" />
          </Link>

          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <ShowcaseDetailText
              type="date"
              month={showcase.month}
              year={showcase.year}
            />
          </p>

          <h1 className="max-w-4xl font-playfair text-5xl font-bold text-white md:text-7xl">
            {showcase.theme}
          </h1>
        </div>
      </section>

      {showcase.description && (
        <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <div
            className="prose-photography text-lg"
            dangerouslySetInnerHTML={{
              __html:
                showcase.descriptionHtml ||
                `<p>${showcase.description}</p>`,
            }}
          />
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <h2 className="mb-8 font-playfair text-3xl font-bold text-white">
          <ShowcaseDetailText
            type="photos"
            count={showcase.photos.length}
          />
        </h2>

        <GalleryLightbox photos={lightboxPhotos} columns={3} />

        {photographers.length > 0 && (
          <div className="mt-12 border-t border-zinc-800 pt-8">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              <ShowcaseDetailText type="photographers" />
            </h3>

            <div className="flex flex-wrap gap-4">
              {photographers.map((name: any) => {
                const photo = showcase.photos.find(
                  (item: any) => item.photographer === name
                )

                return photo?.photographerSlug ? (
                  <Link
                    key={name}
                    href={`/members/${photo.photographerSlug}`}
                    className="text-sm text-zinc-400 transition-colors hover:text-amber-400"
                  >
                    {name}
                  </Link>
                ) : (
                  <span key={name} className="text-sm text-zinc-400">
                    {name}
                  </span>
                )
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}