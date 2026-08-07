"use client"

import { PageHero } from "@/components/ui/page-hero"
import { useLanguage } from "@/components/language-provider"

export function ShowcaseHero() {
  const { language } = useLanguage()

  return (
    <PageHero
      eyebrow=""
      title={
        language === "vi"
          ? "Các Bộ Sưu Tập Ảnh"
          : "Photo Collections"
      }
      description={
        language === "vi"
          ? "Mỗi bộ sưu tập là một câu chuyện bằng hình ảnh, ghi lại những hành trình, khoảnh khắc và nguồn cảm hứng qua ống kính của tôi."
          : "Each collection tells a visual story, capturing memorable journeys, inspiring moments, and the beauty I have discovered through my lens."
      }
    />
  )
}