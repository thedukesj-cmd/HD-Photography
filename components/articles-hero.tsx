"use client"

import { useLanguage } from "@/components/language-provider"

export function ArticlesHero() {
  const { language } = useLanguage()

  const content =
    language === "vi"
      ? {
          eyebrow: "KHÁM PHÁ & CHIA SẺ",
          title: "Bài Viết",
          description:
            "Những bài viết về nhiếp ảnh, từ kỹ thuật, thiết bị và hậu kỳ đến những trải nghiệm, ý tưởng sáng tạo và câu chuyện phía sau mỗi bức ảnh.",
        }
      : {
          eyebrow: "EXPLORE & SHARE",
          title: "Articles",
          description:
            "Articles about photography — from technique, equipment, and post-processing to creative ideas, personal experiences, and the stories behind the images.",
        }

  return (
    <div className="text-center mb-16">
      <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
        {content.eyebrow}
      </p>

      <h1 className="font-playfair text-5xl md:text-6xl text-white font-bold">
        {content.title}
      </h1>

      <p className="text-zinc-400 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
        {content.description}
      </p>
    </div>
  )
}