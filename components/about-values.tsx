"use client"

import {
  Camera,
  Heart,
  Users,
  Compass,
} from "lucide-react"

import { SectionTitle } from "@/components/ui/section-title"
import { useLanguage } from "@/components/language-provider"

export function AboutValues() {
  const { language } = useLanguage()

  const values =
    language === "vi"
      ? [
          {
            icon: Camera,
            title: "Nhiếp Ảnh Là Trọng Tâm",
            description:
              "Mỗi thiết kế trên HD Photography đều hướng đến việc tôn vinh vẻ đẹp của từng bức ảnh.",
          },
          {
            icon: Heart,
            title: "Vẻ Đẹp Trong Cuộc Sống",
            description:
              "Tôi tin rằng nhiếp ảnh giúp chúng ta sống chậm lại và trân trọng những khoảnh khắc bình dị nhưng đầy ý nghĩa.",
          },
          {
            icon: Users,
            title: "Hành Trình Được Sẻ Chia",
            description:
              "Tôi luôn trân trọng cơ hội giới thiệu những tác phẩm của các nhiếp ảnh gia khách mời với những góc nhìn đầy cảm hứng.",
          },
          {
            icon: Compass,
            title: "Khám Phá Không Ngừng",
            description:
              "Mỗi chuyến đi đều mang đến những câu chuyện mới, những khung cảnh mới và nguồn cảm hứng mới cho hành trình nhiếp ảnh.",
          },
        ]
      : [
          {
            icon: Camera,
            title: "Photography First",
            description:
              "Every design choice on HD Photography is made to keep the focus on the photographs themselves.",
          },
          {
            icon: Heart,
            title: "Beauty in Everyday Life",
            description:
              "Photography reminds me to slow down, observe, and appreciate the beauty that surrounds us every day.",
          },
          {
            icon: Users,
            title: "A Shared Journey",
            description:
              "I'm honored to feature guest photographers whose creativity and unique perspectives enrich this collection.",
          },
          {
            icon: Compass,
            title: "Always Exploring",
            description:
              "Every journey brings new places, new stories, and fresh inspiration through the lens.",
          },
        ]

  return (
    <section className="py-20 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow={language === "vi" ? "GIÁ TRỊ" : "VALUES"}
          title={
            language === "vi"
              ? "Điều Tôi Luôn Hướng Đến"
              : "What Inspires My Photography"
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex gap-5 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10">
                <Icon className="h-5 w-5 text-amber-400" />
              </div>

              <div>
                <h3 className="mb-2 font-playfair text-xl font-semibold text-white">
                  {title}
                </h3>

                <p className="text-sm leading-relaxed text-zinc-400">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}