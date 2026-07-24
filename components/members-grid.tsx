import { MemberCard } from "@/components/member-card"
import type { Member } from "@/types"

type MembersGridProps = {
  members: Member[]
}

export function MembersGrid({ members }: MembersGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {members.map((member) => (
        <MemberCard key={member.slug} member={member} />
      ))}
    </div>
  )
}