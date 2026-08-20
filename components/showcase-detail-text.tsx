"use client"

import { useLanguage } from "@/components/language-provider"

type Props = {
  type: "back" | "date" | "photos" | "photographers"
  date?: string
  count?: number
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
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }
  ).format(parsed)
}

export function ShowcaseDetailText({
  type,
  date = "",
  count = 0,
}: Props) {
  const { language } = useLanguage()

  if (type === "back") {
    return language === "vi"
      ? "Quay lại Các Bộ Ảnh Nổi Bật"
      : "Back to Photography Showcases"
  }

  if (type === "date") {
    return <>{formatDate(date, language)}</>
  }

  if (type === "photos") {
    return language === "vi"
      ? `${count} bức ảnh`
      : `${count} ${count === 1 ? "photograph" : "photographs"}`
  }

  return language === "vi"
    ? "Nhiếp ảnh gia"
    : "Photographers"
}