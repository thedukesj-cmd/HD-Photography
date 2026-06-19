import type { Metadata } from "next"
import { getAllMembers } from "@/lib/content"
import { MemberCard } from "@/components/member-card"

export const metadata: Metadata = {
  title: "Member Galleries",
  description: "Explore the galleries of Aperture Club photographers — landscapes, portraits, street, wildlife, and more.",
}

export default function MembersPage() {
  const members = getAllMembers()
  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">Our Photographers</p>
          <h1 className="font-playfair text-5xl md:text-6xl text-white font-bold">Member Galleries</h1>
          <p className="text-zinc-400 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            Browse the portfolios of our member photographers. Each gallery reflects a unique voice, 
            vision, and approach to the craft.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map(member => <MemberCard key={member.slug} member={member} />)}
        </div>
        {members.length === 0 && (
          <div className="text-center py-20 text-zinc-600">No member galleries yet.</div>
        )}
      </div>
    </div>
  )
}
