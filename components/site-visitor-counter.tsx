"use client"

import { useEffect, useState } from "react"
import { Users } from "lucide-react"

import { useLanguage } from "@/components/language-provider"

type VisitorData = {
  total: number
  today: number
  day: string
}

export function SiteVisitorCounter() {
  const { language } = useLanguage()

  const [data, setData] =
    useState<VisitorData | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadVisitors() {
      try {
        // First GET the counter and, importantly,
        // the current Pacific-calendar day.
        const initialResponse = await fetch(
          "/api/site-visitors",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        )

        if (!initialResponse.ok) {
          throw new Error(
            "Unable to load visitor counter"
          )
        }

        const initialData =
          (await initialResponse.json()) as VisitorData

        const storageKey =
          `site-visitor:${initialData.day}`

        const alreadyCounted =
          localStorage.getItem(
            storageKey
          ) === "1"

        if (alreadyCounted) {
          if (!cancelled) {
            setData(initialData)
          }

          return
        }

        // First visit from this browser today:
        // increment both Today and Total.
        const countResponse = await fetch(
          "/api/site-visitors",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
          }
        )

        if (!countResponse.ok) {
          throw new Error(
            "Unable to update visitor counter"
          )
        }

        const updatedData =
          (await countResponse.json()) as VisitorData

        localStorage.setItem(
          `site-visitor:${updatedData.day}`,
          "1"
        )

        if (!cancelled) {
          setData(updatedData)
        }
      } catch (error) {
        console.error(
          "Site visitor counter:",
          error
        )

        if (!cancelled) {
          setData(null)
        }
      }
    }

    loadVisitors()

    return () => {
      cancelled = true
    }
  }, [])

  if (!data) {
    return null
  }

  const locale =
    language === "vi"
      ? "vi-VN"
      : "en-US"

  return (
    <div className="flex items-start gap-2 text-sm text-zinc-400">
      <Users className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />

      <div>
        <div className="font-medium text-zinc-300">
          {language === "vi"
            ? "Lượt truy cập"
            : "Visitors"}
        </div>

        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-300">
          <span>
            {language === "vi"
              ? "Hôm nay"
              : "Today"}
            :{" "}
            {data.today.toLocaleString(
              locale
            )}
          </span>

          <span>
            {language === "vi"
              ? "Tổng cộng"
              : "Total"}
            :{" "}
            {data.total.toLocaleString(
              locale
            )}
          </span>
        </div>
      </div>
    </div>
  )
}