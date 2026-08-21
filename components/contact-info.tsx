"use client"

import Image from "next/image"
import { Mail, MapPin } from "lucide-react"

import { useLanguage } from "@/components/language-provider"

export function ContactInfo() {
  const { language } = useLanguage()

  const displayName =
    language === "vi"
      ? "Nguyễn Hồng Đức"
      : "Hong-Duc Nguyen"

  return (
    <div className="lg:col-span-2">
      <div className="relative mb-8 aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900">
        <Image
          src="/uploads/members/Hong-Duc/MyPortrait.jpg"
          alt={displayName}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      <div className="mb-8 text-center">
        <h2 className="font-playfair text-2xl font-semibold text-white">
          {displayName}
        </h2>

        <p className="mt-2 text-sm font-medium text-amber-400">
          {language === "vi"
            ? "Nhiếp ảnh Phong cảnh • Thiên nhiên • Du lịch"
            : "Landscape • Nature • Travel Photographer"}
        </p>
      </div>

      <div className="space-y-5">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10">
            <MapPin className="h-4 w-4 text-amber-400" />
          </div>

          <div>
            <p className="mb-0.5 text-xs font-semibold uppercase tracking-widest text-zinc-600">
              {language === "vi"
                ? "Địa điểm"
                : "Location"}
            </p>

            <p className="text-sm text-zinc-300">
              San Jose, California
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10">
            <Mail className="h-4 w-4 text-amber-400" />
          </div>

          <div>
            <p className="mb-0.5 text-xs font-semibold uppercase tracking-widest text-zinc-600">
              Email
            </p>

            <p className="text-sm text-zinc-300">
              {language === "vi"
                ? "Vui lòng sử dụng biểu mẫu liên hệ."
                : "Please use the contact form."}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-8 text-sm leading-relaxed text-zinc-500">
        {language === "vi"
          ? "Nhiếp ảnh đã đưa tôi đến nhiều vùng đất tuyệt đẹp và giúp tôi gặp gỡ nhiều con người tuyệt vời. Hy vọng một ngày nào đó chúng ta sẽ có dịp gặp nhau và cùng chia sẻ niềm đam mê nhiếp ảnh."
          : "Photography has taken me to beautiful places and introduced me to wonderful people. I hope our paths will cross someday through our shared passion for photography."}
      </p>
    </div>
  )
}