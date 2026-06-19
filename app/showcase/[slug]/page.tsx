import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllShowcases, getShowcaseWithHtml } from "@/lib/content"
import { GalleryLightbox } from "@/components/gallery-lightbox"
import { ArrowLeft } from "lucide-react"

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return getAllShowcases().map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const showcase = await getShowcaseWithHtml(params.slug)
  if (!showcase) return {}
  return {
    title: `${showcase.month} ${showcase.year} — ${showcase.theme}`,
    description: showcase.description,
    openGraph: { images: [{ url: showcase.featuredImage }] },
  }
}

export default async function ShowcasePage({ params }: Props) {
  const showcase = await getShowcaseWithHtml(params.slug)
  if (!showcase) notFound()

  const lightboxPhotos = showcase.photos.map((p: any) => ({
    url: p.url,
    title: p.title,
    description: `${p.photographer}${p.description ? " — " + p.description : ""}`,
  }))

  return (
    <div className="bg-zinc-950 min-h-screen">
      <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src={showcase.featuredImage} alt={`${showcase.month} ${showcase.year}`}
            fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <Link href="/showcase" className="inline-flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors text-sm mb-6">
            <ArrowLeft className="h-4 w-4" /> Showcase Archive
          </Link>
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2">
            {showcase.month} {showcase.year}
          </p>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white">{showcase.theme}</h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="prose-photography text-lg"
          dangerouslySetInnerHTML={{ __html: showcase.descriptionHtml || `<p>${showcase.description}</p>` }} />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <h2 className="font-playfair text-3xl text-white font-bold mb-8">
          Photos <span className="text-zinc-600 text-xl font-normal">({showcase.photos.length})</span>
        </h2>
        <GalleryLightbox photos={lightboxPhotos} columns={3} />

        {showcase.photos.some((p: any) => p.photographer) && (
          <div className="mt-12 pt-8 border-t border-zinc-800">
            <h3 className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-4">Photographers</h3>
            <div className="flex flex-wrap gap-4">
              {Array.from(new Set(showcase.photos.map((p: any) => p.photographer))).map((name: any) => {
                const photo = showcase.photos.find((p: any) => p.photographer === name)
                return photo?.photographerSlug ? (
                  <Link key={name} href={`/members/${photo.photographerSlug}`}
                    className="text-sm text-zinc-400 hover:text-amber-400 transition-colors">{name}</Link>
                ) : (
                  <span key={name} className="text-sm text-zinc-400">{name}</span>
                )
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
