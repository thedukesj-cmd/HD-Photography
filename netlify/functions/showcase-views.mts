import { getStore } from "@netlify/blobs"
import type {
  Config,
  Context,
} from "@netlify/functions"

type CounterData = {
  count: number
}

const STORE_NAME = "showcase-views"

function validSlug(slug: string) {
  return /^[a-zA-Z0-9_-]+$/.test(slug)
}

function getStoreInstance() {
  return getStore({
    name: STORE_NAME,
    consistency: "strong",
  })
}

async function readCount(
  slug: string
): Promise<number> {
  const store = getStoreInstance()

  const data = await store.get(
    `showcases/${slug}`,
    {
      type: "json",
      consistency: "strong",
    }
  ) as CounterData | null

  return data?.count ?? 0
}

async function incrementCount(
  slug: string
): Promise<number> {
  const store = getStoreInstance()
  const key = `showcases/${slug}`

  for (
    let attempt = 0;
    attempt < 5;
    attempt++
  ) {
    const current =
      await store.getWithMetadata(
        key,
        {
          type: "json",
          consistency: "strong",
        }
      )

    if (!current) {
      const created =
        await store.setJSON(
          key,
          {
            count: 1,
          },
          {
            onlyIfNew: true,
          }
        )

      if (created.modified) {
        return 1
      }

      continue
    }

    const data =
      current.data as CounterData

    const nextCount =
      (data?.count ?? 0) + 1

    const updated =
      await store.setJSON(
        key,
        {
          count: nextCount,
        },
        {
          onlyIfMatch:
            current.etag,
        }
      )

    if (updated.modified) {
      return nextCount
    }
  }

  return readCount(slug)
}

export default async function handler(
  request: Request,
  _context: Context
) {
  try {
    const url =
      new URL(request.url)

    const slug =
      url.searchParams.get("slug") ||
      ""

    if (
      !slug ||
      !validSlug(slug)
    ) {
      return Response.json(
        {
          error:
            "Invalid showcase slug",
        },
        {
          status: 400,
        }
      )
    }

    if (
      request.method === "GET"
    ) {
      const count =
        await readCount(slug)

      return Response.json({
        slug,
        count,
      })
    }

    if (
      request.method === "POST"
    ) {
      const count =
        await incrementCount(slug)

      return Response.json({
        slug,
        count,
      })
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
      "Showcase counter error:",
      error
    )

    return Response.json(
      {
        error:
          "Unable to update showcase views",
      },
      {
        status: 500,
      }
    )
  }
}

export const config: Config = {
  path: "/api/showcase-views",
}