import Link from "next/link"
import Image from "next/image"
import type { NewsItem } from "@/types"
import { Calendar, ArrowRight } from "lucide-react"

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="group bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-950/20">
      <Link href={`/news/${item.slug}`} className="block">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={item.featuredImage}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {item.category && (
            <span className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-sm text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-500/30 uppercase tracking-wide">
              {item.category}
            </span>
          )}
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Calendar className="h-3 w-3" />
            {new Date(item.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </div>
          <h3 className="font-playfair text-xl font-semibold text-white group-hover:text-amber-400 transition-colors leading-snug">
            {item.title}
          </h3>
          <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed">{item.excerpt}</p>
          <span className="inline-flex items-center gap-1.5 text-amber-400 text-sm font-medium mt-2 group-hover:gap-2.5 transition-all">
            Read more <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </article>
  )
}
