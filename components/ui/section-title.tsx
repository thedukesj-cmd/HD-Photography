interface SectionTitleProps {
  eyebrow?: string
  title: string
  description?: string
  centered?: boolean
  maxWidth?: string
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  centered = true,
  maxWidth = "max-w-2xl",
}: SectionTitleProps) {
  return (
    <div className={centered ? "text-center mb-14" : "mb-14"}>
      {eyebrow && (
        <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
          {eyebrow}
        </p>
      )}

      <h2 className="font-playfair text-4xl text-white font-bold">
        {title}
      </h2>

      {description && (
        <p
          className={`text-zinc-400 text-lg mt-5 mx-auto leading-relaxed ${maxWidth}`}
        >
          {description}
        </p>
      )}
    </div>
  )
}