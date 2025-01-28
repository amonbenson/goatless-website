import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import icons from "unplugin-icons/vite";
import iconsResolver from "unplugin-icons/resolver";
import components from "unplugin-vue-components/vite";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/hourglass/" : "/",
  plugins: [
    vue(),
    components({
      resolvers: [
        iconsResolver(),
      ],
    }),
    icons(),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
