import { defineStore } from "pinia";

export const useBackdropStore = defineStore("backdrop", {
  state: () => ({
    url: null,
    opacity: 0.05,
    origin: "center",
  }),
  actions: {
    setMedia(url, opacity = undefined, origin = undefined) {
      if (opacity !== undefined) {
        this.opacity = opacity;
      }
      if (origin !== undefined) {
        this.origin = origin;
      }

      // origin needs to be set last because it will trigger the toggle between both image layers
      this.url = url;
    },
  },
});
