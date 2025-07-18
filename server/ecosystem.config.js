module.exports = {
  apps: [
    {
      name: "goatless-website-server",
      script: "server.js",
      interpreter: "deno",
      interpreter_args: "run --allow-net --allow-read --allow-env --env-file=.env --env-file=.env.local",
      watch: true,
    }
  ]
};
