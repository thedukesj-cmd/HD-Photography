"use client"

import { useLanguage } from "@/components/language-provider"

export function AboutStory() {
  const { language } = useLanguage()

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="space-y-8">
        <h2 className="font-playfair text-4xl font-bold text-white">
          {language === "vi"
            ? "Một hành trình nhiếp ảnh được sẻ chia"
            : "A personal journey shared through photography"}
        </h2>

        {language === "vi" ? (
          <>
            <p className="text-zinc-400 text-lg leading-relaxed">
              HD Photography bắt đầu như một không gian cá nhân để tôi chia sẻ
              những bức ảnh mình yêu thích, những vùng đất đã đi qua và những
              khoảnh khắc đáng nhớ trên mỗi hành trình.
            </p>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Nhiếp ảnh giúp tôi sống chậm lại, quan sát nhiều hơn và cảm nhận vẻ
              đẹp của thiên nhiên, con người cũng như những điều bình dị trong
              cuộc sống. Mỗi bức ảnh đều lưu giữ một câu chuyện và một cảm xúc
              riêng.
            </p>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Theo thời gian, HD Photography cũng trở thành nơi tôi trân trọng
              giới thiệu những tác phẩm của các nhiếp ảnh gia khách mời mà tôi
              yêu mến và ngưỡng mộ. Những góc nhìn khác nhau đã góp phần làm cho
              bộ sưu tập này phong phú và nhiều cảm hứng hơn.
            </p>
          </>
        ) : (
          <>
            <p className="text-zinc-400 text-lg leading-relaxed">
              HD Photography began as my personal gallery—a place to share the
              photographs I make, the places I visit, and the moments I want to
              remember.
            </p>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Photography has taught me to slow down, observe, and appreciate
              the beauty of nature, travel, and everyday life. Every photograph
              preserves a story, a memory, and a moment that might otherwise
              quietly pass by.
            </p>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Over time, HD Photography has also become a place to feature guest
              photographers whose work I admire. Their unique perspectives bring
              fresh inspiration and enrich this collection of photographic
              stories.
            </p>
          </>
        )}
      </div>
    </section>
  )
}