import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar } from "lucide-react"

import { getAllMembers, getMemberWithHtml } from "@/lib/content"
import { MemberGalleries } from "@/components/member-galleries"
import { MemberSpecialties } from "@/components/member-specialties"
import { MemberHeaderText } from "@/components/member-header-text"
import { MemberProfileCopy } from "@/components/member-profile-copy"

interface Props {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return getAllMembers().map((member) => ({
    slug: member.slug,
  }))
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const member = await getMemberWithHtml(params.slug)

  if (!member) return {}

  return {
    title: `${member.name} — Member Gallery`,
    description: member.bio,
    openGraph: {
      images: [{ url: member.profilePhoto }],
    },
  }
}

export default async function MemberPage({ params }: Props) {
  const member = await getMemberWithHtml(params.slug)

  if (!member) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          href="/members"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-amber-400"
        >
          <ArrowLeft className="h-4 w-4" />
          <MemberHeaderText type="back" />
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-3">
          <div className="space-y-5 md:col-span-1">
            <div className="relative mx-auto aspect-square max-w-xs overflow-hidden rounded-2xl md:max-w-none">
              <Image
                src={member.profilePhoto}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <MemberProfileCopy
              name={member.name}
              nameVi={member.nameVi}
              tagline={member.tagline}
              taglineVi={member.taglineVi}
              bio={member.bio}
              bioVi={member.bioVi}
              owner={member.owner}
            />

            <div className="mt-4 mb-6 space-y-4">
              {!member.owner && (
                <p className="flex items-center gap-2.5 text-sm text-amber-400">
                  <Calendar className="h-4 w-4" />
                  <MemberHeaderText type="guest" />
                </p>
              )}

              {member.specialties &&
                member.specialties.length > 0 && (
                  <MemberSpecialties
                    specialties={member.specialties}
                  />
                )}
            </div>
          </div>
        </div>
      </section>

      {member.galleries && member.galleries.length > 0 && (
        <section className="border-t border-zinc-800/60 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <MemberGalleries galleries={member.galleries} />
          </div>
        </section>
      )}
    </div>
  )
}