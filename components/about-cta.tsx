import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function AboutCTA() {
  return (
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
  )
}