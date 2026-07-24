import type { Metadata } from "next"
import { getAllMembers } from "@/lib/content"
import { MembersHero } from "@/components/members-hero"
import { MembersGrid } from "@/components/members-grid"
import { MembersEmptyState } from "@/components/members-empty-state"

export const metadata: Metadata = {
  title: "Photographers",
  description: "Meet the photographers whose work is featured on HD Photography.",
}

export default function MembersPage() {
  const members = getAllMembers()

  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <MembersHero />
        <MembersGrid members={members} />

       {members.length === 0 && <MembersEmptyState />}
      </div>
    </div>
  )
}