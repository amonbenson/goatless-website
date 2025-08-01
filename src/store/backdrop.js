import { defineStore } from "pinia";

export const useBackdropStore = defineStore("backdrop", {
  state: () => ({
    url: null,
    opacity: 0.05,
  }),
  actions: {
    setMedia(url, opacity = undefined) {
      this.url = url;
      if (opacity !== undefined) {
        this.opacity = opacity;
      }
    },
  },
});
