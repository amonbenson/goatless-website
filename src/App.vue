<script setup>
import { ref } from "vue";
import HeaderBar from "@/components/HeaderBar.vue";
import ScrollContainer from "@/components/ScrollContainer.vue";
import FooterBar from "@/components/FooterBar.vue";
import MenuOverlay from "./components/MenuOverlay.vue";

const menuOpen = ref(false);

const headerItems = [
  { text: "shows", to: "/shows" },
  { text: "members", to: "/members" },
];

const footerItems = [
  { text: "contact", to: "/contact" },
  { text: "legal", to: "/legal" },
];

const socials = {
  instagram: "https://www.instagram.com/goatless_official",
  tiktok: "https://www.tiktok.com/@goatless_official",
  youtube: "https://www.youtube.com/@goatless_official",
};
</script>

<template>
  <BackdropMedia
    class="fixed inset-0 pointer-events-none -z-10"
  />

  <HeaderBar
    v-model:menu-open="menuOpen"
    :items="headerItems"
    class="fixed left-0 top-0 w-full h-12 z-30"
  />

  <ScrollContainer
    is="main"
    class="w-screen h-screen"
  >
    <div class="w-full min-h-full pt-20 pb-16 flex items-center justify-center">
      <RouterView class="w-full" />
    </div>
  </ScrollContainer>

  <FooterBar
    :items="footerItems"
    :socials="socials"
    class="hidden sm:block fixed left-0 bottom-0 w-full h-8 z-30"
  />

  <MenuOverlay
    v-model:menu-open="menuOpen"
    :header-items="headerItems"
    :footer-items="footerItems"
    :socials="socials"
    class="fixed top-0 left-0 w-screen h-screen z-20"
  />
</template>
