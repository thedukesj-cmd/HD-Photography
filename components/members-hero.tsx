"use client"

import { PageHero } from "@/components/ui/page-hero"
import { useLanguage } from "@/components/language-provider"

export function MembersHero() {
  const { language } = useLanguage()

  return (
    <PageHero
      eyebrow="HD PHOTOGRAPHY"
      title={
        language === "vi"
          ? "Nhiếp Ảnh Gia"
          : "Photographers"
      }
      description={
        language === "vi"
          ? "Nhiếp ảnh là một hành trình đẹp hơn khi được sẻ chia. Đây là những nhiếp ảnh gia mà tôi trân trọng và vinh dự được giới thiệu trên HD Photography."
          : "Photography is a journey best shared with others. These are photographers whose work I admire and am honored to feature on HD Photography."
      }
    />
  )
}