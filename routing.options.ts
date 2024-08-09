import type { RouterConfig } from "nuxt/schema";

export default <RouterConfig> {
  scrollBehavior: () => {
    // always scroll to top
    return { top: 0 };
  }
};
