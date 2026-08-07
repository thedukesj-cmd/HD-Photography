"use client"

import { PageHero } from "@/components/ui/page-hero"
import { useLanguage } from "@/components/language-provider"

export function NewsHero() {
  const { language } = useLanguage()

  return (
    <PageHero
      eyebrow={language === "vi" ? "TIN TỨC" : "NEWS"}
      title={language === "vi" ? "Tin Tức" : "News"}
      description={
        language === "vi"
          ? "Theo dõi những bộ sưu tập ảnh mới, bài viết, cập nhật về HD Photography và các nhiếp ảnh gia khách mời."
          : "Stay up to date with new photo collections, articles, website updates, and featured guest photographers on HD Photography."
      }
    />
  )
}