import express from "express";
import crypto from "crypto";

const app = express();

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/push", (req, res) => {
  const secret = process.env.WEBHOOK_SECRET;
  res.send("Push received");
});

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
  console.log(`Webhook API is running on port ${PORT}`);
});
