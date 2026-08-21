"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import type { Member } from "@/types"

type HomeAboutProps = {
  featuredMember: Member
}

export function HomeAbout({
  featuredMember,
}: HomeAboutProps) {
  const { translations, language } = useLanguage()
  const text = translations.home.featuredPhotographer

  const displayName =
    language === "vi"
      ? featuredMember.nameVi || featuredMember.name
      : featuredMember.name

  const displayBio =
    language === "vi"
      ? featuredMember.bioVi || featuredMember.bio
      : featuredMember.bio

  const previewPhotos =
    featuredMember.galleryPhotos?.slice(0, 3) || []

  return (
    <section className="border-y border-zinc-800/60 bg-zinc-900/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
          {text.eyebrow}
        </p>

        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 lg:gap-20">
          <div className="relative mx-auto w-full max-w-lg md:mx-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900">
              <Image
                src={featuredMember.profilePhoto}
                alt={displayName}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>

            {previewPhotos.length > 0 && (
              <div className="absolute -bottom-7 left-5 right-5 grid grid-cols-3 gap-2">
                {previewPhotos.map((photo, index) => (
                  <div
                    key={`${photo.url}-${index}`}
                    className="relative aspect-square overflow-hidden rounded-xl border-2 border-zinc-950 bg-zinc-900 shadow-xl"
                  >
                    <Image
                      src={photo.url}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="12vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-8 md:pt-0">
            <h2 className="font-playfair text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              {displayName}
            </h2>

            {featuredMember.specialties &&
              featuredMember.specialties.length > 0 && (
                <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-amber-400">
                  {featuredMember.specialties.join(" · ")}
                </p>
              )}

            {displayBio && (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
                {displayBio}
              </p>
            )}

            <Link
              href={`/members/${featuredMember.slug}`}
              className="group mt-8 inline-flex items-center gap-2 font-medium text-amber-400 transition-colors hover:text-amber-300"
            >
              {text.exploreGallery}

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}