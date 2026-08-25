"use client"

import {
  Camera,
  Compass,
  Heart,
  Users,
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
              "Mọi thiết kế trên HD Photography đều hướng đến việc tôn vinh hình ảnh và để mỗi bức ảnh tự kể câu chuyện của mình.",
          },
          {
            icon: Heart,
            title: "Vẻ Đẹp Trong Cuộc Sống",
            description:
              "Tôi tin rằng nhiếp ảnh giúp chúng ta sống chậm lại, quan sát kỹ hơn và trân trọng những khoảnh khắc bình dị nhưng đầy ý nghĩa.",
          },
          {
            icon: Users,
            title: "Hành Trình Được Sẻ Chia",
            description:
              "Tôi trân trọng cơ hội giới thiệu tác phẩm của các nhiếp ảnh gia thân hữu, mỗi người mang đến một góc nhìn và nguồn cảm hứng riêng.",
          },
          {
            icon: Compass,
            title: "Khám Phá Không Ngừng",
            description:
              "Mỗi chuyến đi đều mở ra những câu chuyện, khung cảnh và trải nghiệm mới, tiếp tục nuôi dưỡng niềm đam mê nhiếp ảnh.",
          },
        ]
      : [
          {
            icon: Camera,
            title: "Photography First",
            description:
              "Every design choice on HD Photography is intended to honor the images and give each photograph room to tell its own story.",
          },
          {
            icon: Heart,
            title: "Beauty in Everyday Life",
            description:
              "Photography encourages me to slow down, observe more carefully, and appreciate the meaningful beauty found in everyday moments.",
          },
          {
            icon: Users,
            title: "A Shared Journey",
            description:
              "I value the opportunity to feature Photographer Friends, each bringing a distinctive perspective and source of inspiration.",
          },
          {
            icon: Compass,
            title: "Always Exploring",
            description:
              "Every journey brings new stories, landscapes, and experiences that continue to inspire my photography.",
          },
        ]

  return (
    <section className="border-y border-zinc-800/60 bg-zinc-900/30 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow={language === "vi" ? "GIÁ TRỊ" : "VALUES"}
          title={
            language === "vi"
              ? "Điều Tôi Luôn Hướng Đến"
              : "What Inspires My Photography"
          }
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {values.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex gap-5 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700"
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