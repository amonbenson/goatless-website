module.exports = {
  apps: [
    {
      name: "goatless-nuxt",
      port: 80,
      script: "./.output/server/index.mjs",
      max_memory_restart: "500M",
      env_production: {
        NODE_ENV: "production",
        PORT: 80,
        exec_mode: "cluster",
        instances: "max"
      }
    }
  ]
};
