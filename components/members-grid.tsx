import { MemberCard } from "@/components/member-card"
import type { Member } from "@/types"

type MembersGridProps = {
  members: Member[]
}

export function MembersGrid({
  members,
}: MembersGridProps) {
  const gridClassName =
    members.length === 1
      ? "mx-auto grid max-w-sm grid-cols-1 gap-6"
      : members.length === 2
        ? "mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2"
        : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"

  return (
    <div className={gridClassName}>
      {members.map((member) => (
        <MemberCard
          key={member.slug}
          member={member}
        />
      ))}
    </div>
  )
}