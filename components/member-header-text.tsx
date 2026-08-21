"use client"

import { useLanguage } from "@/components/language-provider"

type MemberHeaderTextProps = {
  type: "back" | "guest"
  owner?: boolean
}

export function MemberHeaderText({
  type,
  owner = false,
}: MemberHeaderTextProps) {
  const { translations, language } = useLanguage()

  if (type === "back") {
    if (owner) {
      return (
        <>
          {language === "vi"
            ? "Quay lại Trang chủ"
            : "Back to Home"}
        </>
      )
    }

    return (
      <>
        {translations.common.backToGuestPhotographers}
      </>
    )
  }

  return (
    <>
      {translations.common.guestPhotographer}
    </>
  )
}