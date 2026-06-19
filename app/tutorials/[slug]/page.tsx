import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllTutorials, getTutorialWithHtml } from "@/lib/content"
import { Calendar, Clock, User, ArrowLeft, Tag } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return getAllTutorials().map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tutorial = await getTutorialWithHtml(params.slug)
  if (!tutorial) return {}
  return {
    title: tutorial.title,
    description: tutorial.excerpt,
    openGraph: { images: [{ url: tutorial.featuredImage }] },
  }
}

const difficultyColor: Record<string, string> = {
  Beginner: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Intermediate: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
}

export default async function TutorialPage({ params }: Props) {
  const tutorial = await getTutorialWithHtml(params.slug)
  if (!tutorial) notFound()

  return (
    <div className="bg-zinc-950 min-h-screen">
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src={tutorial.featuredImage} alt={tutorial.title}
            fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/10" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <Link href="/tutorials" className="inline-flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors text-sm mb-6">
            <ArrowLeft className="h-4 w-4" /> All Tutorials
          </Link>
          {tutorial.difficulty && (
            <span className={cn("inline-block text-xs px-3 py-1 rounded-full border font-medium mb-4",
              difficultyColor[tutorial.difficulty] || difficultyColor.Beginner)}>
              {tutorial.difficulty}
            </span>
          )}
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white leading-tight">{tutorial.title}</h1>
        </div>
      </section>

      <div className="border-b border-zinc-800 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-5 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {tutorial.author}</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(tutorial.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            {tutorial.readTime && <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {tutorial.readTime}</span>}
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <p className="text-xl text-zinc-400 italic mb-10 leading-relaxed">{tutorial.excerpt}</p>
        <div className="prose-photography" dangerouslySetInnerHTML={{ __html: tutorial.contentHtml || "" }} />
        {tutorial.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-zinc-800">
            <div className="flex items-center gap-3 flex-wrap">
              <Tag className="h-4 w-4 text-zinc-500" />
              {tutorial.tags.map((tag: string) => (
                <span key={tag} className="text-sm px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
