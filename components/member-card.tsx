"use client"

import Image from "next/image"
import Link from "next/link"

import type { Member } from "@/types"
import { PhotoCard } from "@/components/ui/photo-card"
import { useLanguage } from "@/components/language-provider"

export function MemberCard({
  member,
}: {
  member: Member
}) {
  const { language } = useLanguage()

  const displayName =
    language === "vi"
      ? member.nameVi || member.name
      : member.name

  return (
    <Link
      href={`/members/${member.slug}`}
      className="group block"
    >
      <PhotoCard className="overflow-hidden">
        <div className="relative aspect-[4/5] bg-zinc-950">
          {member.profilePhoto ? (
            <Image
              src={member.profilePhoto}
              alt={displayName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-contain transition duration-300 group-hover:brightness-110"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-600">
              {displayName}
            </div>
          )}
        </div>

        <div className="px-5 py-5 text-center">
          <h3 className="font-playfair text-xl font-semibold text-white transition-colors group-hover:text-amber-400">
            {displayName}
          </h3>
        </div>
      </PhotoCard>
    </Link>
  )
}