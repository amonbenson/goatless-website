import { Application, Router, send } from "jsr:@oak/oak";
import { oakCors } from "jsr:@tajpouria/cors";
import { Buffer } from "node:buffer";
import crypto from "node:crypto";
import axios from "axios";
import { detach } from "https://jsr.io/@std/encoding/1.0.10/_common_detach.ts";
import { cwd } from "node:process";

const router = new Router();

// ping command
router.get("/ping", (ctx) => {
  ctx.response.status = 200;
  ctx.response.body = "pong";
});

// get upcoming events
router.get("/events", async (ctx) => {
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
const originEnv = Deno.env.get("CORS_ORIGIN") ?? "";
app.use(oakCors({
  origin: originEnv.startsWith("/") ? new RegExp(originEnv) : originEnv,
}));
app.use(router.routes());
app.use(router.allowedMethods());


app.addEventListener("listen", (event) => {
  console.log(`Server is running on https://localhost:${event.port}`);
});

await app.listen({
  port: Deno.env.get("PORT") || 5000,
});
