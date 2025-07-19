import express from "express";
import crypto from "crypto";
import fs, { fdatasync } from "fs";
import { exec } from "child_process";

const PORT = process.env.PORT ?? 5000;
const WEBHOOK_PIPE = process.env.WEBHOOK_PIPE ?? "webhook.pipe";

const app = express();

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/push", (req, res) => {
  // // invoke the autodeploy script by sending a command to the webhook pipe
  // if (!fs.existsSync(WEBHOOK_PIPE)) {
  //   console.error(`Pipe ${WEBHOOK_PIPE} does not exist.`)
  //   return res.status(500).send("Failed to trigger rebuild.");
  // }

  // const stream = fs.createWriteStream(WEBHOOK_PIPE);

  // stream.on("error", (err) => {
  //   console.error("Error writing to pipe:", err.message);
  //   res.status(500).send("Failed to trigger rebuild.");
  // });

  // stream.end("push\n", () => {
  //   console.log(`Sent push command to pipe ${WEBHOOK_PIPE}`)
  //   res.send("Rebuild triggered successfully.")
  // });

  // pull new changes
  exec("git pull", {
    cwd: "/repository", // location where the whole repository is mounted as a volume
  }, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Automatic rebuild failed.");
    }

    console.log(stdout);
    res.send("Ok");
  });
});

app.listen(PORT, () => {
  console.log(`Webhook API is running on port ${PORT}`);
});
