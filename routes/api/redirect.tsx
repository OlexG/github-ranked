// The request just redirects the user to /image/{name} where name is part of the request
// The response is a 302 redirect
// The response body is empty
import { type Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req: Request) {
    const url = new URL(req.url);
    const name = url.searchParams.get("name");
    // Perform a 302 redirect to `/image/{name}`
    const redirectUrl = new URL(`/image/${name}`, url.origin).href;
    return Response.redirect(redirectUrl, 302);
  },
};

