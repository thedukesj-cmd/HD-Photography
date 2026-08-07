"use client"

import Link from "next/link"
import Image from "next/image"
import { Globe, Instagram } from "lucide-react"

import type { Member } from "@/types"
import { PhotoCard } from "@/components/ui/photo-card"
import { useLanguage } from "@/components/language-provider"

export function MemberCard({ member }: { member: Member }) {
  const { language, translations } = useLanguage()

  const translatedSpecialties =
    member.specialties?.map((specialty) => {
      return (
        translations.member.specialties[
          specialty as keyof typeof translations.member.specialties
        ] ?? specialty
      )
    }) ?? []

  return (
    <Link href={`/members/${member.slug}`} className="group block">
      <PhotoCard className="group">
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
            <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-bold text-zinc-950">
              {language === "vi" ? "Nổi bật" : "Featured"}
            </span>
          )}
        </div>

        <div className="p-5">
          <h3 className="font-playfair text-xl font-semibold text-white transition-colors group-hover:text-amber-400">
            {member.name}
          </h3>

          {translatedSpecialties.length > 0 && (
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-amber-400/80">
              {translatedSpecialties.slice(0, 2).join(" · ")}
            </p>
          )}

          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-zinc-400">
            {member.bio}
          </p>

          <div className="mt-4 flex items-center gap-3">
            {member.website && (
              <span className="text-zinc-600 transition-colors hover:text-amber-400">
                <Globe className="h-4 w-4" />
              </span>
            )}

            {member.instagram && (
              <span className="text-zinc-600 transition-colors hover:text-amber-400">
                <Instagram className="h-4 w-4" />
              </span>
            )}

            <span className="ml-auto text-xs text-zinc-600">
              {member.galleryPhotos.length}{" "}
              {language === "vi" ? "ảnh" : "photos"}
            </span>
          </div>
        </div>
      </PhotoCard>
    </Link>
  )
}