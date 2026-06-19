import type { Metadata } from "next"
import { getAllTutorials } from "@/lib/content"
import { TutorialSearch } from "@/components/tutorial-search"

export const metadata: Metadata = {
  title: "Tutorials",
  description: "Learn photography techniques and skills from Aperture Club members. Beginner to advanced tutorials on landscape, portrait, street, and more.",
}

export default function TutorialsPage() {
  const tutorials = getAllTutorials()
  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">Learn & Grow</p>
          <h1 className="font-playfair text-5xl md:text-6xl text-white font-bold">Tutorials</h1>
          <p className="text-zinc-400 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            Practical guides written by our members — covering technique, gear, post-processing, 
            and the mindset behind great photography.
          </p>
        </div>
        <TutorialSearch tutorials={tutorials} />
      </div>
    </div>
  )
}
