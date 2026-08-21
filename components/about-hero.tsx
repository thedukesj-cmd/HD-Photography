"use client"

import { PageHero } from "@/components/ui/page-hero"
import { useLanguage } from "@/components/language-provider"

export function AboutHero() {
  const { language } = useLanguage()

  return (
    <PageHero
      eyebrow={
        language === "vi"
          ? "GIỚI THIỆU"
          : "ABOUT"
      }
      title={
        language === "vi"
          ? "Về HD Photography"
          : "About HD Photography"
      }
      description={
        language === "vi"
          ? "HD Photography là không gian nơi tôi chia sẻ những hành trình, những khoảnh khắc đáng nhớ và vẻ đẹp của thiên nhiên, du lịch cùng cuộc sống qua ống kính của tôi."
          : "HD Photography is my personal space for sharing memorable journeys, quiet moments, and the beauty of nature, travel, and everyday life through my photography."
      }
    />
  )
}