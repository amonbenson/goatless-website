import { Application, Router, send } from "jsr:@oak/oak";
import { oakCors } from "jsr:@tajpouria/cors";
import crypto from "node:crypto";
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


const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET");
const WEBHOOK_REF = Deno.env.get("WEBHOOK_REF");

const webhookRouter = new Router();

webhookRouter.post("/internal/webhook", async (ctx) => {
  // get the provided signature
  const signature = ctx.request.headers.get("X-Hub-Signature-256");
  if (!signature) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Missing signature" };
    return;
  }

  // receive the request body and verify the signature
  if (!ctx.request.hasBody) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Missing request body" };
    return;
  }
  const body = await ctx.request.body.json();
  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  hmac.update(JSON.stringify(body));
  const expectedSignature = `sha256=${hmac.digest("hex")}`;
  if (signature !== expectedSignature) {
    ctx.response.status = 403;
    ctx.response.body = { error: "Invalid signature" };
    return;
  }

  console.log("Received valid webhook request:", body);

  // check if code was pushed to main branch
  if (body.action === "push" && body.ref === WEBHOOK_REF) {
    console.log("Content was pushed to main branch, triggering automatic download...");

    // download the latest content from the repository
  }

  ctx.response.status = 200;
  ctx.response.body = { message: "Webhook received and verified" };
  return;
});

app.use(webhookRouter.routes());
app.use(webhookRouter.allowedMethods());


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
