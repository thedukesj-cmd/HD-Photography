"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { useLanguage } from "@/components/language-provider"

type GalleryPhoto = {
  url: string
}

type FeaturedMember = {
  slug: string
  name: string
  profilePhoto: string
  specialties?: string[]
  bio: string
  galleryPhotos: GalleryPhoto[]
}

type HomeAboutProps = {
  featuredMember: FeaturedMember
}

export function HomeAbout({ featuredMember }: HomeAboutProps) {
  const { translations } = useLanguage()
  const text = translations.home.featuredPhotographer

  return (
    <section className="py-20 bg-zinc-900/40 border-y border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-10 text-center">
          {text.eyebrow}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src={featuredMember.profilePhoto}
                alt={featuredMember.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {featuredMember.galleryPhotos.length > 0 && (
              <div className="absolute -bottom-6 left-4 right-4 flex gap-2">
                {featuredMember.galleryPhotos.slice(0, 3).map((photo, index) => (
                  <div
                    key={index}
                    className="relative flex-1 aspect-square rounded-lg overflow-hidden border-2 border-zinc-950 shadow-xl"
                  >
                    <Image
                      src={photo.url}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="10vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="md:pl-4 pt-8 md:pt-0">
            <div className="space-y-4">
              <p className="font-playfair text-4xl md:text-5xl font-bold text-white leading-tight">
                {featuredMember.name}
              </p>

              {featuredMember.specialties && (
                <p className="text-amber-400 font-medium tracking-wide">
                  {featuredMember.specialties.join(" · ")}
                </p>
              )}

              <p className="text-zinc-400 text-lg leading-relaxed">
                {featuredMember.bio}
              </p>

              <Link
                href={`/members/${featuredMember.slug}`}
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium transition-colors group mt-4"
              >
                {text.exploreGallery}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}