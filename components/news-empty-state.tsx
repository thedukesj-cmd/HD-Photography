"use client"

import { useLanguage } from "@/components/language-provider"

export function NewsEmptyState() {
  const { language } = useLanguage()

  return (
    <div className="py-20 text-center">
      <h2 className="font-playfair text-3xl font-bold text-white mb-3">
        {language === "vi"
          ? "Chưa có tin tức"
          : "No News Yet"}
      </h2>

      <p className="max-w-lg mx-auto text-zinc-500">
        {language === "vi"
          ? "Những thông tin về các bộ sưu tập ảnh mới, bài viết và cập nhật của HD Photography sẽ được đăng tại đây."
          : "Updates about new photo collections, articles, featured photographers, and HD Photography will appear here."}
      </p>
    </div>
  )
}