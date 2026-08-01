import { Camera, Heart, Users, Sparkles } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"

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

export function AboutValues() {
  return (
    <section className="py-20 bg-zinc-900/40 border-y border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
         eyebrow="WHAT GUIDES THIS SITE"
        title="The Idea Behind HD Photography"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex gap-5 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800"
            >
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
  )
}