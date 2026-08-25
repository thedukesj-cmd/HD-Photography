"use client"

import { useLanguage } from "@/components/language-provider"

export function AboutStory() {
  const { language } = useLanguage()

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 md:py-24">
      <div className="space-y-8">
           <h2 className="mx-auto max-w-3xl text-balance text-center font-playfair text-4xl font-bold leading-tight text-white md:text-5xl">
          {language === "vi"
            ? "Một hành trình nhiếp ảnh được sẻ chia"
            : "A Personal Journey Shared Through Photography"}
        </h2>

        {language === "vi" ? (
          <>
            <p className="text-lg leading-relaxed text-zinc-400">
              HD Photography bắt đầu như một không gian riêng để tôi chia sẻ
              những bức ảnh mình yêu thích, những vùng đất đã đi qua và những
              khoảnh khắc đáng nhớ trên mỗi hành trình.
            </p>

            <p className="text-lg leading-relaxed text-zinc-400">
              Nhiếp ảnh giúp tôi sống chậm lại, quan sát nhiều hơn và cảm nhận
              sâu sắc hơn vẻ đẹp của thiên nhiên, con người và những điều bình
              dị trong cuộc sống. Mỗi bức ảnh lưu giữ một câu chuyện, một ký ức
              và một cảm xúc riêng.
            </p>

            <p className="text-lg leading-relaxed text-zinc-400">
              Theo thời gian, HD Photography cũng trở thành nơi tôi trân trọng
              giới thiệu tác phẩm của những nhiếp ảnh gia thân hữu mà tôi yêu
              mến và ngưỡng mộ. Mỗi người mang đến một góc nhìn riêng, góp phần
              làm cho không gian này phong phú và nhiều cảm hứng hơn.
            </p>
          </>
        ) : (
          <>
            <p className="text-lg leading-relaxed text-zinc-400">
              HD Photography began as a personal space where I could share the
              photographs I love, the places I have visited, and the memorable
              moments gathered along the way.
            </p>

            <p className="text-lg leading-relaxed text-zinc-400">
              Photography has taught me to slow down, observe more carefully,
              and appreciate the beauty of nature, people, and everyday life.
              Every photograph holds a story, a memory, and an emotion of its
              own.
            </p>

            <p className="text-lg leading-relaxed text-zinc-400">
              Over time, HD Photography has also become a place where I am
              honored to feature Photographer Friends whose work I admire. Each
              brings a unique perspective that adds richness and inspiration to
              this shared photographic space.
            </p>
          </>
        )}
      </div>
    </section>
  )
}