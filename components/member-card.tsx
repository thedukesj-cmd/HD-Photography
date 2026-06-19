import Link from "next/link"
import Image from "next/image"
import type { Member } from "@/types"
import { Globe, Instagram } from "lucide-react"

export function MemberCard({ member }: { member: Member }) {
  return (
    <Link href={`/members/${member.slug}`} className="group block">
      <article className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-950/20">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={member.profilePhoto}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {member.featured && (
            <span className="absolute top-3 left-3 bg-amber-500 text-zinc-950 text-xs font-bold px-2.5 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-playfair text-xl font-semibold text-white group-hover:text-amber-400 transition-colors">
            {member.name}
          </h3>
          {member.specialties && member.specialties.length > 0 && (
            <p className="text-amber-400/80 text-xs mt-1 font-medium tracking-wide uppercase">
              {member.specialties.slice(0, 2).join(" · ")}
            </p>
          )}
          <p className="text-zinc-400 text-sm mt-2.5 line-clamp-2 leading-relaxed">{member.bio}</p>
          <div className="flex items-center gap-3 mt-4">
            {member.website && (
              <span className="text-zinc-600 hover:text-amber-400 transition-colors">
                <Globe className="h-4 w-4" />
              </span>
            )}
            {member.instagram && (
              <span className="text-zinc-600 hover:text-amber-400 transition-colors">
                <Instagram className="h-4 w-4" />
              </span>
            )}
            <span className="ml-auto text-xs text-zinc-600">
              {member.galleryPhotos.length} photos
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
