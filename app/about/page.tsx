import type { Metadata } from "next"

import { AboutHero } from "@/components/about-hero"
import { AboutStory } from "@/components/about-story"
import { AboutValues } from "@/components/about-values"
import { AboutCTA } from "@/components/about-cta"

export const metadata: Metadata = {
  title: "About HD Photography",
  description:
    "Discover HD Photography, the personal photography gallery of Hong-Duc Nguyen, featuring nature, travel, everyday life, photography stories, and guest photographers.",
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