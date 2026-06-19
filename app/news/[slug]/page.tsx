import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllNews, getNewsWithHtml } from "@/lib/content"
import { Calendar, ArrowLeft } from "lucide-react"

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return getAllNews().map(n => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getNewsWithHtml(params.slug)
  if (!item) return {}
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: { images: [{ url: item.featuredImage }] },
  }
}

export default async function NewsItemPage({ params }: Props) {
  const item = await getNewsWithHtml(params.slug)
  if (!item) notFound()

  return (
    <div className="bg-zinc-950 min-h-screen">
      <section className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src={item.featuredImage} alt={item.title}
            fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/10" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <Link href="/news" className="inline-flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors text-sm mb-6">
            <ArrowLeft className="h-4 w-4" /> All News
          </Link>
          {item.category && (
            <span className="inline-block text-xs px-3 py-1 mb-4 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wide font-semibold">
              {item.category}
            </span>
          )}
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white leading-tight">{item.title}</h1>
          <div className="flex items-center gap-1.5 text-zinc-400 text-sm mt-4">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(item.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <p className="text-xl text-zinc-400 italic mb-10 leading-relaxed">{item.excerpt}</p>
        <div className="prose-photography" dangerouslySetInnerHTML={{ __html: item.contentHtml || "" }} />
      </article>
    </div>
  )
}
