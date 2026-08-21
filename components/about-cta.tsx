"use client"

import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export function AboutCTA() {
  const { language } = useLanguage()

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 md:py-24 lg:px-8">
      <h2 className="font-playfair text-4xl font-bold text-white md:text-5xl">
        {language === "vi"
          ? "Cảm Ơn Bạn Đã Ghé Thăm"
          : "Thank You for Visiting"}
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
        {language === "vi"
          ? "Tôi hy vọng những bức ảnh nơi đây sẽ mời bạn sống chậm lại, nhìn kỹ hơn và cảm nhận thế giới bằng một góc nhìn mới."
          : "I hope these photographs invite you to slow down, look more closely, and see the world with fresh eyes."}
      </p>

      <div className="mt-9">
        <Button
          href="/contact"
          size="lg"
          className="gap-2"
        >
          {language === "vi"
            ? "Liên Hệ Với Tôi"
            : "Contact Me"}

          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}