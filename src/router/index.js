import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "setlist-generator",
    path: "/setlistgenerator",
    component: () => import("@/views/SetlistGenerator.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
