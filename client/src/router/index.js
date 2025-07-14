import { createRouter, createWebHistory } from "vue-router/auto";
import { routes } from "vue-router/auto-routes";

// extract the endpoint part of the base URL
const base = import.meta.env.BASE_URL;
const baseRoute = base.replace(/^https?:\/\/[^\/]+/, "");

const router = createRouter({
  history: createWebHistory(baseRoute),
  // scrollBehavior(to, _from, savedPosition) {
  //   // Scroll to top on navigation
  //   if (savedPosition) {
  //     return savedPosition;
  //   }
  //   if (to.hash) {
  //     return { el: to.hash, behavior: "smooth" };
  //   } else {
  //     setTimeout(() => {
  //       window.scrollTo(0, 0);
  //     }, 1);
  //   }
  // },
  routes,
});

// handle extenal links
// router.beforeEach((to) => {
//   if (to.path.startsWith("http")) {
//     location.href = to.path;
//   }
// });

export default router;
