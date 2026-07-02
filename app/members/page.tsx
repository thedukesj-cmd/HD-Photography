import type { Metadata } from "next"
import { getAllMembers } from "@/lib/content"
import { MemberCard } from "@/components/member-card"

export const metadata: Metadata = {
  title: "Photographers",
  description: "Meet the photographers whose work is featured on HD Photography.",
}

export default function MembersPage() {
  const members = getAllMembers()

  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            HD PHOTOGRAPHY
          </p>

          <h1 className="font-playfair text-5xl md:text-6xl text-white font-bold">
            Photographers
          </h1>

          <p className="text-zinc-400 text-lg mt-5 max-w-3xl mx-auto leading-relaxed">
            Photography is a journey best shared with others. These are photographers whose work I admire and am honored to feature on HD Photography.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map(member => <MemberCard key={member.slug} member={member} />)}
        </div>

        {members.length === 0 && (
          <div className="text-center py-20 text-zinc-600">
            No photographers have been featured yet.
          </div>
        )}
      </div>
    </div>
  )
}