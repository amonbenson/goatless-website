module.exports = {
  apps: [
    {
      name: "goatless-website",
      port: 80,
      script: "./.output/server/index.mjs",
      max_memory_restart: "1500M",
      env_production: {
        NODE_ENV: "production",
        PORT: 80,
        exec_mode: "cluster",
        instances: "max"
      }
    },
    {
      name: "deploy-webhook",
      port: 8923,
      script: "gunicorn -w 2 -b $HOST:$PORT webhook:app",
      max_memory_restart: "1500M",
      env_production: {
        PORT: 8923,
        exec_mode: "cluster",
        instances: "max"
      }
    }
  ]
};
