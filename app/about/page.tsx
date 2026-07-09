import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Camera, Heart, Users, Sparkles } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description:
    "About HD Photography — the personal photography gallery of Hong-Duc Nguyen, featuring nature, travel, everyday life, and guest photographers.",
}

const values = [
  {
    icon: Camera,
    title: "Photography First",
    description:
      "HD Photography exists to let the photographs speak first — with a quiet, simple presentation that keeps the focus on the image.",
  },
  {
    icon: Heart,
    title: "Beauty in Everyday Moments",
    description:
      "I believe photography helps us slow down, observe, and appreciate the beauty that often goes unnoticed.",
  },
  {
    icon: Users,
    title: "Shared Journey",
    description:
      "Photography becomes richer when it is shared. HD Photography also features guest photographers whose vision and creativity inspire me.",
  },
  {
    icon: Sparkles,
    title: "A Better Home for Photography",
    description:
      "This site is also a prototype for a simpler photography platform — one that lets photographers organize their work naturally and present it beautifully.",
  },
]

export default function AboutPage() {
  return (
    <div className="bg-zinc-950 text-zinc-100">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=2000&q=80"
            alt="Forest with light"
            fill
            className="object-cover opacity-50"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 to-zinc-950" />
        </div>

        <div className="relative z-10 text-center px-4">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            OUR STORY
          </p>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white">
            About HD Photography
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl text-white font-bold">
            A personal gallery for a shared love of photography
          </h2>

          <p className="text-zinc-400 text-lg leading-relaxed">
            HD Photography began as my personal gallery — a place to share the
            photographs I make, the places I visit, and the moments I want to remember.
          </p>

          <p className="text-zinc-400 text-lg leading-relaxed">
            Photography has given me the opportunity to slow down, observe, and
            appreciate the beauty that often goes unnoticed. Through nature, travel,
            portraits, and everyday scenes, I try to preserve moments that might
            otherwise quietly pass by.
          </p>

          <p className="text-zinc-400 text-lg leading-relaxed">
            Over time, HD Photography has also become a place to welcome guest
            photographers whose work inspires me. Their photographs bring new voices,
            new perspectives, and new stories into this gallery.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-zinc-900/40 border-y border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
              WHAT GUIDES THIS SITE
            </p>
            <h2 className="font-playfair text-4xl text-white font-bold">
              The Idea Behind HD Photography
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-5 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="shrink-0 w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center">
                  <Icon className="h-5 w-5 text-amber-400" />
                </div>

                <div>
                  <h3 className="font-playfair text-xl text-white font-semibold mb-2">
                    {title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-playfair text-4xl text-white font-bold mb-4">
          Thank you for visiting
        </h2>

        <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          I hope these photographs invite you to slow down, look closely, and see
          the world with fresh eyes.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/30"
        >
          Contact Me <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}