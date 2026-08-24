"use client"

import { useEffect, useState } from "react"
import { Eye } from "lucide-react"

import { useLanguage } from "@/components/language-provider"

interface ShowcaseViewCounterProps {
  slug: string
}

function getTodayKey() {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0")
  const day = String(
    now.getDate()
  ).padStart(2, "0")

  return `${year}-${month}-${day}`
}

export function ShowcaseViewCounter({
  slug,
}: ShowcaseViewCounterProps) {
  const { language } = useLanguage()

  const [count, setCount] =
    useState<number | null>(null)

  useEffect(() => {
    if (!slug) return

    let cancelled = false

    async function loadViews() {
      try {
        const today =
          getTodayKey()

        const storageKey =
          `showcase-view:${slug}:${today}`

        const alreadyCounted =
          localStorage.getItem(
            storageKey
          ) === "1"

        const response =
          await fetch(
            `/api/showcase-views?slug=${encodeURIComponent(
              slug
            )}`,
            {
              method:
                alreadyCounted
                  ? "GET"
                  : "POST",

              headers: {
                Accept:
                  "application/json",
              },
            }
          )

        if (!response.ok) {
          throw new Error(
            "Unable to load showcase views"
          )
        }

        const data =
          await response.json()

        if (!cancelled) {
          setCount(
            typeof data.count ===
              "number"
              ? data.count
              : 0
          )
        }

        if (!alreadyCounted) {
          localStorage.setItem(
            storageKey,
            "1"
          )
        }
      } catch (error) {
        console.error(
          "Showcase view counter:",
          error
        )

        if (!cancelled) {
          setCount(null)
        }
      }
    }

    loadViews()

    return () => {
      cancelled = true
    }
  }, [slug])

  if (count === null) {
    return null
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-300">
      <Eye className="h-4 w-4" />

      <span>
        {count.toLocaleString(
          language === "vi"
            ? "vi-VN"
            : "en-US"
        )}
      </span>

      <span>
        {language === "vi"
          ? "lượt xem"
          : count === 1
            ? "view"
            : "views"}
      </span>
    </span>
  )
}