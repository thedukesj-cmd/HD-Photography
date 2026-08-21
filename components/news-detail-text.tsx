"use client"

import { useLanguage } from "@/components/language-provider"

type Props = {
  type: "back" | "date"
  date?: string
}

function formatDate(date: string, language: string) {
  if (!date) return ""

  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return date
  }

  return new Intl.DateTimeFormat(
    language === "vi" ? "vi-VN" : "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }
  ).format(parsed)
}

export function NewsDetailText({
  type,
  date = "",
}: Props) {
  const { language } = useLanguage()

  if (type === "back") {
    return (
      <>
        {language === "vi"
          ? "Quay lại Tin Tức"
          : "Back to News"}
      </>
    )
  }

  return <>{formatDate(date, language)}</>
}