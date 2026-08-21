"use client"

import { PageHero } from "@/components/ui/page-hero"
import { useLanguage } from "@/components/language-provider"

export function ArticlesHero() {
  const { language } = useLanguage()

  return (
    <PageHero
      eyebrow={
        language === "vi"
          ? "KHÁM PHÁ & CHIA SẺ"
          : "EXPLORE & SHARE"
      }
      title={
        language === "vi"
          ? "Bài Viết"
          : "Articles"
      }
      description={
        language === "vi"
          ? "Những bài viết về nhiếp ảnh, từ kỹ thuật, thiết bị và hậu kỳ đến những trải nghiệm, ý tưởng sáng tạo và câu chuyện phía sau mỗi bức ảnh."
          : "Articles about photography — from technique, equipment, and post-processing to creative ideas, personal experiences, and the stories behind the images."
      }
    />
  )
}