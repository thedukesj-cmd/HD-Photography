import Image from "next/image"
import { Mail, MapPin } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="lg:col-span-2 space-y-8">
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80"
          alt="Photography and architecture"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
      </div>

      <div className="space-y-5">
        <div className="flex gap-4">
          <div className="shrink-0 w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center">
            <MapPin className="h-4 w-4 text-amber-400" />
          </div>

          <div>
            <p className="text-xs text-zinc-600 uppercase tracking-widest font-semibold mb-0.5">
              Location
            </p>
            <p className="text-zinc-300 text-sm">San Jose, California</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="shrink-0 w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center">
            <Mail className="h-4 w-4 text-amber-400" />
          </div>

          <div>
            <p className="text-xs text-zinc-600 uppercase tracking-widest font-semibold mb-0.5">
              Email
            </p>
            <p className="text-zinc-300 text-sm">
              Contact me using the form
            </p>
          </div>
        </div>
      </div>

      <p className="text-zinc-500 text-sm leading-relaxed">
        Photography has introduced me to wonderful places and wonderful people.
        I hope our paths cross through photography someday.
      </p>
    </div>
  )
}