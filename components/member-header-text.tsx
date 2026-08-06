"use client"

import { useLanguage } from "@/components/language-provider"

export function MemberHeaderText({
  type,
}: {
  type: "back" | "guest"
}) {
  const { translations } = useLanguage()

  return (
    <>
      {type === "back"
        ? translations.common.backToGuestPhotographers
        : translations.common.guestPhotographer}
    </>
  )
}