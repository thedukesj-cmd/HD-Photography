"use client"

import { useLanguage } from "@/components/language-provider"

export function NewsEmptyState() {
  const { language } = useLanguage()

  return (
    <div className="py-20 text-center">
      <h2 className="mb-3 font-playfair text-3xl font-bold text-white">
        {language === "vi"
          ? "Chưa có tin tức"
          : "No News Yet"}
      </h2>

      <p className="mx-auto max-w-lg text-zinc-500">
        {language === "vi"
          ? "Tin tức về các bộ ảnh nổi bật mới, bài viết, nhiếp ảnh gia thân hữu và những cập nhật của HD Photography sẽ được đăng tại đây."
          : "News about new photography showcases, articles, Photographer Friends, and HD Photography updates will appear here."}
      </p>
    </div>
  )
}