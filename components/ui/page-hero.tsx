interface PageHeroProps {
  eyebrow?: string
  title: string
  description: string
}

export function PageHero({
  eyebrow,
  title,
  description,
}: PageHeroProps) {
  return (
    <div className="text-center mb-16">
      {eyebrow && (
        <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
          {eyebrow}
        </p>
      )}

      <h1 className="font-playfair text-5xl md:text-6xl text-white font-bold">
        {title}
      </h1>

      <p className="text-zinc-400 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  )
}