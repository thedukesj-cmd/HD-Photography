import { TutorialSearch } from "@/components/tutorial-search"
import type { Tutorial } from "@/types"

type TutorialsContentProps = {
  tutorials: Tutorial[]
}

export function TutorialsContent({
  tutorials,
}: TutorialsContentProps) {
  return <TutorialSearch tutorials={tutorials} />
}