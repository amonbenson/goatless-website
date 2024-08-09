<script setup>
import { computed } from "vue";
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
const backgroundImage = useState("backgroundImage", () => null);
const backgroundImageStyle = computed(() => {
  return backgroundImage.value ? `url(${backgroundImage.value})` : "none";
});

// reset background image on route change
const router = useRouter();
router.beforeEach(() => {
  backgroundImage.value = null;
});

const menuOpen = defineModel("menuOpen");
</script>

<template>
  <div
    class="flex flex-col min-h-screen bg-center bg-cover bg-fixed bg-blend-overlay bg-background bg-opacity-85"
    :style="{
      backgroundImage: backgroundImageStyle,
      transition: 'background-image 300ms ease-in-out',
    }"
  >
    <div class="fixed z-max top-0 p-4">
      <a href="#main-content" class="bg-background text-foreground sr-only focus:not-sr-only">Skip to main content</a>
    </div>

    <HeaderBar
      v-model:menuOpen="menuOpen"
      class="z-header sticky top-0"
      :links="headerLinks"
    />

    <main id="main-content" class="flex-grow flex flex-col">
      <div class="container mx-auto px-4 flex-grow flex flex-col justify-center my-8">
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
