import type { Metadata } from "next"

import { getAllMembers } from "@/lib/content"
import { MembersHero } from "@/components/members-hero"
import { MembersGrid } from "@/components/members-grid"
import { MembersEmptyState } from "@/components/members-empty-state"

export const metadata: Metadata = {
  title: "Guest Photographers",
  description:
    "Meet the guest photographers whose work is featured on HD Photography.",
}

export default function MembersPage() {
  const members = getAllMembers().filter(
    (member) => !member.owner
  )

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <MembersHero />

        {members.length > 0 ? (
          <MembersGrid members={members} />
        ) : (
          <MembersEmptyState />
        )}
      </div>
    </div>
  )
}