"use client"

import { useLanguage } from "@/components/language-provider"

export function MemberSpecialties({
  specialties,
}: {
  specialties: string[]
}) {
  const { translations } = useLanguage()

  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
        {translations.member.photographyInterests}
      </p>

      <div className="flex flex-wrap gap-2">
        {specialties.map((specialty) => (
          <span
            key={specialty}
            className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs text-amber-400"
          >
            {translations.member.specialties[
            specialty as keyof typeof translations.member.specialties
            ] ?? specialty}
          </span>
        ))}
      </div>
    </div>
  )
}