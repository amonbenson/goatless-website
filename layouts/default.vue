<script setup>
import Backdrop from "@/components/Backdrop.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import FooterBar from "@/components/FooterBar.vue";
import NavOverlay from "@/components/NavOverlay.vue";

const headerLinks = [
  { to: "/shows", label: "shows" },
  { to: "/members", label: "members" }
];

const footerLinks = [
  { to: "/contact", label: "contact" },
  { to: "/legal", label: "legal" }
];

const socials = [
  { to: "https://www.instagram.com/goatless_official", icon: "teenyicons:instagram-outline" },
  { to: "https://www.youtube.com/@goatless_official", icon: "teenyicons:youtube-outline" },
  { to: "https://tiktok.com/@goatless_official", icon: "teenyicons:tiktok-outline" }
];

const menuOpen = defineModel("menuOpen");
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Backdrop class="absolute inset-0 z-backdrop pointer-events-none" />

    <!-- Skip to main content link -->
    <div class="fixed z-max top-0 p-4">
      <a href="#main-content" class="bg-background text-foreground sr-only focus:not-sr-only">Skip to main content</a>
    </div>

    <HeaderBar
      v-model:menuOpen="menuOpen"
      class="z-header sticky top-0"
      :links="headerLinks"
    />

    <main id="main-content" class="flex-grow flex justify-center items-center">
      <div class="container mx-auto px-4 py-8">
        <slot />
      </div>
    </main>

    <NavOverlay
      v-model:menuOpen="menuOpen"
      class="z-overlay"
      :header-links="headerLinks"
      :footer-links="footerLinks"
    />

    <FooterBar
      class="z-footer sticky bottom-0"
      :links="footerLinks"
      :socials="socials"
    />
  </div>
</template>
