import Image from "next/image"

export function AboutHero() {
  return (
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
  )
}