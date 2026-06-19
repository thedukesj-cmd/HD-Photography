import Link from "next/link"
import Image from "next/image"
import type { Showcase } from "@/types"
import { Images } from "lucide-react"

export function ShowcaseCard({ showcase }: { showcase: Showcase }) {
  return (
    <Link href={`/showcase/${showcase.slug}`} className="group block">
      <article className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-950/20">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={showcase.featuredImage}
            alt={`${showcase.month} ${showcase.year} showcase`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-1">
              {showcase.month} {showcase.year}
            </p>
            <h3 className="font-playfair text-xl font-bold text-white leading-snug group-hover:text-amber-300 transition-colors">
              {showcase.theme}
            </h3>
          </div>
        </div>
        <div className="px-4 py-3 flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-800">
          <span className="line-clamp-1 flex-1 pr-4">{showcase.description}</span>
          <span className="flex items-center gap-1 shrink-0">
            <Images className="h-3.5 w-3.5" /> {showcase.photos.length}
          </span>
        </div>
      </article>
    </Link>
  )
}
