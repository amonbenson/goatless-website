import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import icons from "unplugin-icons/vite";
import iconsResolver from "unplugin-icons/resolver";
import components from "unplugin-vue-components/vite";
import markdown from "unplugin-vue-markdown/vite";
import vueRouter from "unplugin-vue-router/vite";

const base = process.env.BASE_URL ?? "/";
// eslint-disable-next-line no-console
console.info("Using base URL:", base);

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [
    vueRouter({
      extensions: [".vue", ".md"],
      importMode: "async",
    }),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    markdown({
      markdownitOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      headEnabled: true,
      wrapperComponent: "MarkdownBody",
      wrapperDiv: false,
    }),
    components({
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
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
