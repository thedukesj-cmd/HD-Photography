"use client"

import { useLanguage } from "@/components/language-provider"

type Props = {
  name: string
  nameVi?: string
  tagline?: string
  taglineVi?: string
  bio: string
  bioVi?: string
  owner?: boolean
}

export function MemberProfileCopy({
  name,
  nameVi,
  tagline,
  taglineVi,
  bio,
  bioVi,
  owner,
}: Props) {
  const { language } = useLanguage()

  const displayName =
    language === "vi" && nameVi ? nameVi : name

  const displayTagline =
    language === "vi" && taglineVi ? taglineVi : tagline

  const displayBio =
    language === "vi" && bioVi ? bioVi : bio

  return (
    <>
      <h1 className="mb-3 font-playfair text-4xl font-bold text-white md:text-5xl">
        {displayName}
      </h1>

      {owner && displayTagline && (
        <p className="mt-3 max-w-2xl text-lg italic leading-relaxed text-zinc-300">
          {displayTagline}
        </p>
      )}

      {displayBio && (
        <div className="prose-photography mt-6 space-y-4">
          {displayBio
            .split(/\n\s*\n/)
            .filter(Boolean)
            .map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
        </div>
      )}
    </>
  )
}