import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllMembers, getMemberWithHtml } from "@/lib/content"
import { MemberGalleries } from "@/components/member-galleries"
import { Globe, Instagram, ArrowLeft, Calendar } from "lucide-react"

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return getAllMembers().map(m => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const member = await getMemberWithHtml(params.slug)
  if (!member) return {}
  return {
    title: `${member.name} — Member Gallery`,
    description: member.bio,
    openGraph: { images: [{ url: member.profilePhoto }] },
  }
}

export default async function MemberPage({ params }: Props) {
  const member = await getMemberWithHtml(params.slug)
  if (!member) notFound()

  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link href="/members" className="inline-flex items-center gap-2 text-zinc-500 hover:text-amber-400 transition-colors text-sm">
          <ArrowLeft className="h-4 w-4" /> All Members
        </Link>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-5">
            <div className="relative aspect-square overflow-hidden rounded-2xl max-w-xs mx-auto md:max-w-none">
              <Image src={member.profilePhoto} alt={member.name} fill
                sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" priority />
              
            </div>
            
            
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-3">{member.name}</h1>
            <div className="space-y-4 mt-4 mb-6">
  {member.owner ? (
    <p className="flex items-center gap-2.5 text-amber-400 text-sm">
      <Calendar className="h-4 w-4" /> Founder of HD Photography
    </p>
  ) : (
    <p className="flex items-center gap-2.5 text-amber-400 text-sm">
      <Calendar className="h-4 w-4" /> Guest Photographer
    </p>
  )}

  {member.specialties && member.specialties.length > 0 && (
    <div className="flex flex-wrap gap-2">
      {member.specialties.map((s: string) => (
        <span key={s} className="text-xs px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">{s}</span>
      ))}
    </div>
  )}
</div>
<div className="prose-photography mt-6"
              dangerouslySetInnerHTML={{ __html: member.bioHtml || `<p>${member.bio}</p>` }} />
          </div>
        </div>
      </section>

      {/* Multi-gallery tabs */}
      {member.galleries && member.galleries.length > 0 && (
        <section className="py-12 border-t border-zinc-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MemberGalleries galleries={member.galleries} />
          </div>
        </section>
      )}
    </div>
  )
}
