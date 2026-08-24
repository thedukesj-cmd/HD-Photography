import { getStore } from "@netlify/blobs"
import type {
  Config,
  Context,
} from "@netlify/functions"

type VisitorData = {
  total: number
  day: string
  today: number
}

const STORE_NAME = "site-visitors"
const COUNTER_KEY = "visitor-counts"

function getPacificDay() {
  const parts =
    new Intl.DateTimeFormat(
      "en-CA",
      {
        timeZone:
          "America/Los_Angeles",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    ).formatToParts(
      new Date()
    )

  const year =
    parts.find(
      (part) =>
        part.type === "year"
    )?.value || ""

  const month =
    parts.find(
      (part) =>
        part.type === "month"
    )?.value || ""

  const day =
    parts.find(
      (part) =>
        part.type === "day"
    )?.value || ""

  return `${year}-${month}-${day}`
}

function getVisitorStore() {
  return getStore({
    name: STORE_NAME,
    consistency: "strong",
  })
}

async function readVisitors() {
  const store =
    getVisitorStore()

  const currentDay =
    getPacificDay()

  const data =
    await store.get(
      COUNTER_KEY,
      {
        type: "json",
        consistency: "strong",
      }
    ) as VisitorData | null

  if (!data) {
    return {
      total: 0,
      today: 0,
      day: currentDay,
    }
  }

  return {
    total:
      data.total ?? 0,

    today:
      data.day === currentDay
        ? data.today ?? 0
        : 0,

    day: currentDay,
  }
}

async function incrementVisitors() {
  const store =
    getVisitorStore()

  const currentDay =
    getPacificDay()

  for (
    let attempt = 0;
    attempt < 5;
    attempt++
  ) {
    const current =
      await store.getWithMetadata(
        COUNTER_KEY,
        {
          type: "json",
          consistency: "strong",
        }
      )

    if (!current) {
      const created =
        await store.setJSON(
          COUNTER_KEY,
          {
            total: 1,
            day: currentDay,
            today: 1,
          },
          {
            onlyIfNew: true,
          }
        )

      if (created.modified) {
        return {
          total: 1,
          today: 1,
          day: currentDay,
        }
      }

      continue
    }

    const data =
      current.data as VisitorData

    const sameDay =
      data.day === currentDay

    const next: VisitorData = {
      total:
        (data.total ?? 0) + 1,

      day: currentDay,

      today:
        sameDay
          ? (data.today ?? 0) + 1
          : 1,
    }

    const updated =
      await store.setJSON(
        COUNTER_KEY,
        next,
        {
          onlyIfMatch:
            current.etag,
        }
      )

    if (updated.modified) {
      return next
    }
  }

  return readVisitors()
}

export default async function handler(
  request: Request,
  _context: Context
) {
  try {
    if (request.method === "GET") {
      return Response.json(
        await readVisitors()
      )
    }

    if (request.method === "POST") {
      return Response.json(
        await incrementVisitors()
      )
    }

    return Response.json(
      {
        error:
          "Method not allowed",
      },
      {
        status: 405,
      }
    )
  } catch (error) {
    console.error(
      "Site visitor counter error:",
      error
    )

    return Response.json(
      {
        error:
          "Unable to update visitor counter",
      },
      {
        status: 500,
      }
    )
  }
}

export const config: Config = {
  path: "/api/site-visitors",
}