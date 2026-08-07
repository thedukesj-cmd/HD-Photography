"use client"

import { PageHero } from "@/components/ui/page-hero"
import { useLanguage } from "@/components/language-provider"

export function ContactHero() {
  const { language } = useLanguage()

  return (
    <PageHero
      eyebrow={language === "vi" ? "LIÊN HỆ" : "CONTACT"}
      title={language === "vi" ? "Liên Hệ" : "Contact"}
      description={
        language === "vi"
          ? "Cảm ơn bạn đã ghé thăm HD Photography. Nếu bạn muốn trao đổi về nhiếp ảnh, chia sẻ ý tưởng, hợp tác hoặc đơn giản chỉ muốn gửi lời chào, tôi rất vui được lắng nghe."
          : "Thank you for visiting HD Photography. Whether you'd like to talk about photography, share ideas, discuss a collaboration, or simply say hello, I'd be delighted to hear from you."
      }
    />
  )
}