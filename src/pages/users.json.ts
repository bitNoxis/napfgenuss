import type { APIRoute } from "astro"

export const POST: APIRoute = ({ request }) => {
    return new Response(JSON.stringify({
        message: "This was a POST!"
      })
    )
  }