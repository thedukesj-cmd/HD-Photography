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
          ? "Các Bộ Ảnh Nổi Bật"
          : "Photography Showcases"
      }
      description={
        language === "vi"
          ? "Mỗi bộ ảnh là một câu chuyện riêng, ghi lại những chuyến đi, sự kiện, khoảnh khắc đáng nhớ và nguồn cảm hứng qua ống kính nhiếp ảnh."
          : "Each showcase tells its own visual story, capturing memorable journeys, events, moments, and photographic inspiration."
      }
    />
  )
}