import { Application, Router, send } from "jsr:@oak/oak";
import { oakCors } from "jsr:@tajpouria/cors";
import { Buffer } from "node:buffer";
import crypto from "node:crypto";
import axios from "axios";
import { detach } from "https://jsr.io/@std/encoding/1.0.10/_common_detach.ts";
import { cwd } from "node:process";

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


const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET");
const WEBHOOK_REF = Deno.env.get("WEBHOOK_REF");
const WEBHOOK_REPO_URL = Deno.env.get("WEBHOOK_REPO_URL");

const webhookRouter = new Router();

// webhookRouter.post("/internal/webhook", async (ctx) => {
//   // receive the request body and verify the signature
//   if (!ctx.request.hasBody) {
//     ctx.response.status = 400;
//     ctx.response.body = { error: "Missing request body" };
//     return;
//   }

//   const rawBody = await ctx.request.body.text();
//   const sig = Buffer.from(ctx.request.headers.get("X-Hub-Signature-256") ?? "", "utf-8");
//   const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
//   const digest = Buffer.from(`sha256=${hmac.update(rawBody).digest('hex')}`, "utf8");
//   if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
//     ctx.response.status = 403;
//     ctx.response.body = { error: "Invalid signature" };
//     return;
//   }

//   // decode the body
//   const body = JSON.parse(new URLSearchParams(rawBody).get("payload")) || {};
//   console.log("Received valid webhook request:", body);

//   // check if code was pushed to main branch
//   if (body.ref === WEBHOOK_REF && body.repository?.url === WEBHOOK_REPO_URL) {
//     console.log("Code pushed to main branch, updating content...");

//     // run pull_build_restart.sh script
//     // detach the process so it continues to run when the server is stopped
//     // use a timeout to ensure the server has time to respond before exiting
//     setTimeout(() => {
//       console.log("Rebuilding code...");
//       const cmd = new Deno.Command("/usr/bin/bash", {
//         args: [""],
//         detach: true,
//       });
//       const child = cmd.spawn();
//       child.output();
//       child.unref();
//       console.log("Exiting the current server...");
//       Deno.exit(0);
//     }, 1000);
//   }

//   ctx.response.status = 200;
//   ctx.response.body = { message: "Webhook received and verified" };
//   return;
// });

// app.use(webhookRouter.routes());
// app.use(webhookRouter.allowedMethods());


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

app.addEventListener("listen", (event) => {
  console.log(`Server is running on https://localhost:${event.port}`);
});

await app.listen({
  port: Deno.env.get("PORT") || 443,
  secure: true,
  cert: Deno.readTextFileSync(Deno.env.get("SSL_CERT")),
  key: Deno.readTextFileSync(Deno.env.get("SSL_KEY")),
});
