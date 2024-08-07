import type { RouterConfig } from "nuxt/schema";

export default <RouterConfig> {
  scrollBehavior: async (to, from, savedPosition) => {
    // always scroll to top
    return { top: 0 };
  }
};
