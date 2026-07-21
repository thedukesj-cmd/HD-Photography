import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HomeCTA() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80"
          alt="Forest light"
          fill
          className="object-cover opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950" />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to share your vision?
        </h2>

        <p className="text-zinc-400 text-lg leading-relaxed mb-10">
          Join a community of photographers who are as passionate about the art
          as you are. Monthly meetups, workshops, critique sessions, and a
          showcase that celebrates every perspective.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-10 py-4 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 text-lg"
        >
          Get in Touch
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  )
}