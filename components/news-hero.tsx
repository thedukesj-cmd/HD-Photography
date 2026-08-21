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
          ? "Theo dõi các bộ ảnh nổi bật mới, bài viết, cập nhật về HD Photography và các nhiếp ảnh gia khách mời."
          : "Stay up to date with new photography showcases, articles, HD Photography updates, and featured guest photographers."
      }
    />
  )
}