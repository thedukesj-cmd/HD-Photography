import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Camera, Heart, Users, Award } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about HD Photography Club — our story, our mission, and the community we've built around the love of photography.",
}

const values = [
  { icon: Camera, title: "Craft First", description: "We believe in the constant pursuit of technical and artistic excellence. Every meeting, workshop, and showcase pushes us to grow." },
  { icon: Heart, title: "Community", description: "Photography can be a solitary pursuit. The club exists to make it a shared one — with honest feedback, shared knowledge, and genuine camaraderie." },
  { icon: Users, title: "Inclusivity", description: "Whether you shoot with a phone or a medium-format camera, you belong here. We welcome all skill levels, genres, and perspectives." },
  { icon: Award, title: "Recognition", description: "Great work deserves to be seen. Our annual exhibition, monthly showcase, and member spotlights ensure that exceptional photography gets the audience it deserves." },
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
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">Our Story</p>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white">About HD Photography</h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl text-white font-bold">
            Founded on a shared passion for light
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            HD Photography Club was born from a simple idea: that photography is better when it's shared.
            A small group of photographers who kept crossing paths at sunrise shoots and golden-hour spots
            decided to stop shooting alone — and start building something together.
          </p>
          <p className="text-zinc-400 text-lg leading-relaxed">
            What started as a handful of people meeting once a month has grown into a thriving community
            spanning every genre of photography: landscape, portrait, street, wildlife, macro, architecture,
            documentary, and fine art. What unites us isn't a single style — it's a shared commitment to
            taking photography seriously while keeping it joyful.
          </p>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Our monthly meetings, annual exhibition, member gallery website, and workshop programme are
            all run by volunteers who genuinely believe in what this club does: making photographers better
            and helping great images find the audience they deserve.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-zinc-900/40 border-y border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">What we stand for</p>
            <h2 className="font-playfair text-4xl text-white font-bold">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-5 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="shrink-0 w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center">
                  <Icon className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl text-white font-semibold mb-2">{title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join us CTA */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-playfair text-4xl text-white font-bold mb-4">Join our community</h2>
        <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          All skill levels are welcome — from smartphone shooters to seasoned professionals.
          If you love photography, you have a place here.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/30"
        >
          Get in touch <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}
