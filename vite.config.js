import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";

// load vite environment variables
const viteEnv = loadEnv(process.env.NODE_ENV, process.cwd());

// https://vite.dev/config/
export default defineConfig({
  base: viteEnv.VITE_BASE_URL,
  plugins: [
    vue({
      include: [/\.vue$/],
    }),
    svgLoader(),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
