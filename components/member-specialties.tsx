"use client"

import { useLanguage } from "@/components/language-provider"

type MemberSpecialtiesProps = {
  specialties: string[]
  specialtiesVi?: string[]
}

/*
 * Fallback translations for older member profiles
 * that do not yet define specialtiesVi.
 */
const defaultSpecialtyVi: Record<string, string> = {
  Flowers: "Hoa",
  Landscape: "Phong cảnh",
  Nature: "Thiên nhiên",
  Travel: "Du lịch",
  Portrait: "Chân dung",
  Portraits: "Chân dung",
  "Life Portraits": "Chân dung Cuộc sống",
  "Black & White": "Đen & Trắng",
  Wildlife: "Động vật hoang dã",
  Architecture: "Kiến trúc",
  Documentary: "Nhiếp ảnh tài liệu",
  "Street Photography": "Nhiếp ảnh đường phố",
  Macro: "Nhiếp ảnh cận cảnh",
  Astrophotography: "Nhiếp ảnh thiên văn",
  "Bird Photography": "Nhiếp ảnh chim",
}

export function MemberSpecialties({
  specialties,
  specialtiesVi,
}: MemberSpecialtiesProps) {
  const { language } = useLanguage()

  const displaySpecialties =
    language === "vi"
      ? specialties.map(
          (specialty, index) =>
            specialtiesVi?.[index] ||
            defaultSpecialtyVi[specialty] ||
            specialty
        )
      : specialties

  if (displaySpecialties.length === 0) {
    return null
  }

  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
        {language === "vi"
          ? "Thể loại nhiếp ảnh"
          : "Photography Specialties"}
      </p>

      <div className="flex max-w-full flex-wrap gap-2">
        {displaySpecialties.map(
          (specialty, index) => (
            <span
              key={`${specialty}-${index}`}
              className="max-w-full rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-400"
            >
              {specialty}
            </span>
          )
        )}
      </div>
    </div>
  )
}