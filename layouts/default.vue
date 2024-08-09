<script setup>
import HeaderBar from "@/components/HeaderBar.vue";
import FooterBar from "@/components/FooterBar.vue";
import NavOverlay from "@/components/NavOverlay.vue";

const headerLinks = [
  { to: "/shows", label: "shows" },
  { to: "/repertoire", label: "repertoire" },
  { to: "/members", label: "members" },
  { to: "/about", label: "about" }
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

// use current background image state
const backdropMedia = useState("backdropMedia", () => null);
const backdropOpacity = useState("backdropOpacity", () => 0.5);

// reset background image on route change
const router = useRouter();
router.beforeEach(() => {
  backdropMedia.value = null;
  backdropOpacity.value = 0.5;
});

const menuOpen = defineModel("menuOpen");
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="absolute inset-0 z-backdrop bg-background pointer-events-none">
      <!-- Background Image -->
      <div
        class="absolute inset-0 bg-center bg-cover bg-fixed"
        :style="{
          backgroundImage: backdropMedia ? `url(${backdropMedia})` : 'none',
          transition: 'background-image 300ms ease-in-out',
        }"
      />

      <!-- Dark Overlay -->
      <div
        class="absolute inset-0 bg-background"
        :style="{ opacity: backdropOpacity }"
      />
    </div>

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
