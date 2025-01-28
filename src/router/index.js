import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import PageNotFound from "@/views/PageNotFound.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/:pathMatch(.*)*", // 404
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(), // TODO: add process.env.BASE_URL
  routes,
});

export default router;
