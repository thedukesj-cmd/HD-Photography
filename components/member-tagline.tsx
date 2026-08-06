"use client"

import { useLanguage } from "@/components/language-provider"

export function MemberTagline() {
  const { translations } = useLanguage()

  return (
    <p className="mt-3 max-w-2xl text-lg italic leading-relaxed text-zinc-300">
      {translations.member.tagline}
    </p>
  )
}