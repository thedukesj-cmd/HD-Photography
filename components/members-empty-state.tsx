"use client"

import { useLanguage } from "@/components/language-provider"

export function MembersEmptyState() {
  const { language } = useLanguage()

  return (
    <div className="py-20 text-center text-zinc-500">
      {language === "vi"
        ? "Hiện chưa có nhiếp ảnh gia khách mời nào."
        : "No guest photographers have been featured yet."}
    </div>
  )
}