import { Application, Router, send } from "jsr:@oak/oak";
import { oakCors } from "jsr:@tajpouria/cors";
import axios from "axios";

const router = new Router();

// get upcoming events
router.get("/api/events", async (ctx) => {
  // invoke the bit API
  const app_id = Deno.env.get("BIT_API_KEY");
  const artist_id = Deno.env.get("BIT_ARTIST_ID");

  try {
    const res = await axios.get(`https://rest.bandsintown.com/artists/id_${artist_id}/events/`, {
      params: {
        app_id,
        date: "upcoming",
      },
      validateStatus: (status) => status === 200,
    });

    if (res.status !== 200) {
      ctx.response.status = res.status;
      ctx.response.body = { error: "Failed to fetch events" };
      return;
    }

    ctx.response.body = res.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to fetch events" };
    return;
  }
})

const app = new Application();
app.use(oakCors({
  origin: new RegExp(Deno.env.get("CORS_ORIGIN_REGEX")),
}));
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx) => {
  try {
    // try to server static files
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/../client/dist`,
      index: "index.html",
    });
  } catch (_) {
    // if not found, fall back to index.html
    await send(ctx, "/index.html", {
      root: `${Deno.cwd()}/../client/dist`,
    });
  }
});

await app.listen({
  port: Deno.env.get("PORT") || 443,
  secure: true,
  cert: Deno.readTextFileSync(Deno.env.get("SSL_CERT")),
  key: Deno.readTextFileSync(Deno.env.get("SSL_KEY")),
});
