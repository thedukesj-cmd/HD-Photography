"use client"

import { useLanguage } from "@/components/language-provider"

const vietnameseMonths: Record<string, string> = {
  January: "Tháng 1",
  February: "Tháng 2",
  March: "Tháng 3",
  April: "Tháng 4",
  May: "Tháng 5",
  June: "Tháng 6",
  July: "Tháng 7",
  August: "Tháng 8",
  September: "Tháng 9",
  October: "Tháng 10",
  November: "Tháng 11",
  December: "Tháng 12",
}

type Props = {
  type: "back" | "date" | "photos" | "photographers"
  month?: string
  year?: number
  count?: number
}

export function ShowcaseDetailText({
  type,
  month = "",
  year,
  count = 0,
}: Props) {
  const { language } = useLanguage()

  if (type === "back") {
    return language === "vi"
      ? "Quay lại Các Bộ Sưu Tập Ảnh"
      : "Back to Photo Collections"
  }

  if (type === "date") {
    const displayedMonth =
      language === "vi" ? vietnameseMonths[month] || month : month

    return (
      <>
        {displayedMonth} {year}
      </>
    )
  }

  if (type === "photos") {
    return language === "vi"
      ? `${count} bức ảnh`
      : `${count} ${count === 1 ? "photograph" : "photographs"}`
  }

  return language === "vi" ? "Nhiếp ảnh gia" : "Photographers"
}