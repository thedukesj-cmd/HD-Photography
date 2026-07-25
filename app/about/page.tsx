import { AboutHero } from "@/components/about-hero"
import type { Metadata } from "next"
import { AboutStory } from "@/components/about-story"
import { AboutValues } from "@/components/about-values"
import { AboutCTA } from "@/components/about-cta"

export const metadata: Metadata = {
  title: "About",
  description:
    "About HD Photography — the personal photography gallery of Hong-Duc Nguyen, featuring nature, travel, everyday life, and guest photographers.",
}



export default function AboutPage() {
  return (
    <div className="bg-zinc-950 text-zinc-100">
      <AboutHero />

      <AboutStory />

      <AboutValues />

      <AboutCTA />
    </div>
  )
}