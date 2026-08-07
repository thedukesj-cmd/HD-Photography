"use client"

import { PageHero } from "@/components/ui/page-hero"
import { useLanguage } from "@/components/language-provider"

export function AboutHero() {
  const { language } = useLanguage()

  return (
    <PageHero
      eyebrow={language === "vi" ? "GIỚI THIỆU" : "ABOUT"}
      title={
        language === "vi"
          ? "Về HD Photography"
          : "About HD Photography"
      }
      description={
        language === "vi"
          ? "HD Photography là không gian nơi tôi chia sẻ những hành trình, những khoảnh khắc và vẻ đẹp của thiên nhiên, du lịch cùng cuộc sống qua góc nhìn của mình."
          : "HD Photography is my personal space for sharing the beauty of nature, travel, and everyday life through the stories I capture with my camera."
      }
    />
  )
}