<script setup>
import { onMounted, onUnmounted } from "vue";
import { useBackdropStore } from "@/store/backdrop";
import GoatlessLogo from "./components/GoatlessLogo.vue";
import ShowsSection from "./components/ShowsSection.vue";
import ContactSection from "./components/ContactSection.vue";
import MemberSections from "./components/MemberSections.vue";
import BackdropMedia from "./components/BackdropMedia.vue";
import InstagramIcon from "@/assets/svg/instagram_line.svg";
import TiktokIcon from "@/assets/svg/tiktok_line.svg";
import YoutubeIcon from "@/assets/svg/youtube_line.svg";

const SOCIALS = [
  { icon: InstagramIcon, link: "https://www.instagram.com/goatless_official" },
  { icon: TiktokIcon, link: "https://www.tiktok.com/@goatless_official" },
  { icon: YoutubeIcon, link: "https://www.youtube.com/@goatless_official" },
];

let backdropTriggers = [];

const backdropStore = useBackdropStore();

function getMostVisibleElement(nodeList) {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  let maxVisibleArea = 0;
  let mostVisibleEl = null;

  nodeList.forEach(el => {
    const rect = el.getBoundingClientRect();

    // Skip if completely out of view
    if (rect.bottom <= 0 || rect.top >= viewportHeight) return;

    const visibleTop = Math.max(rect.top, 0);
    const visibleBottom = Math.min(rect.bottom, viewportHeight);
    const visibleHeight = visibleBottom - visibleTop;
    const visibleWidth = Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0));

    const visibleArea = visibleHeight * visibleWidth;

    if (visibleArea > maxVisibleArea) {
      maxVisibleArea = visibleArea;
      mostVisibleEl = el;
    }
  });

  return mostVisibleEl;
}

function handleScroll() {
  const el = getMostVisibleElement(backdropTriggers);

  // update the backdrop media
  const media = el.dataset.backdropMedia;
  const opacity = Number(el.dataset.backdropOpacity ?? 1.0);
  backdropStore.setMedia(media, opacity);
}

onMounted(() => {
  backdropTriggers = document.querySelectorAll("[data-backdrop-media]");

  document.addEventListener("scroll", handleScroll);
  handleScroll();
});

onUnmounted(() => {
  document.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <BackdropMedia
    class="fixed inset-0 pointer-events-none -z-10"
  />

  <header>
    <div class="fixed left-0 top-0 w-screen h-16 bg-black drop-shadow-black/100 drop-shadow-xl z-40">
      <div class="padded-container size-full flex justify-end items-center gap-2">
        <a
          v-for="social in SOCIALS"
          :key="social.link"
          :href="social.link"
          target="_blank"
          rel="noopener noreferrer"
          class="z-50 text-white"
        >
          <component
            :is="social.icon"
            class="size-8"
          />
        </a>
      </div>
    </div>

    <GoatlessLogo class="z-50" />
  </header>

  <main class="space-y-8">
    <div
      id="scroll-placeholder"
      class="h-screen"
    />

    <ShowsSection />

    <ContactSection />

    <MemberSections />
  </main>

  <footer>
    <Section
      title="Impressum"
      section-id="legal"
    >
      <p class="select-text">
        Amon Benson<br>
        Albrechtstr. 35a<br>
        12167 Berlin
      </p>
      <p>
        Phone: <a href="tel:+491622108093">+49 162 2108093</a>
      </p>
      <p>
        Email: <a href="mailto:contact@goatlessband.com">contact@goatlessband.com</a>
      </p>
      <p>
        <a
          href="https://github.com/amonbenson/goatless-website"
          target="_blank"
          rel="noopener noreferrer"
        >No goats were harmed during the making of this website.</a>
      </p>
    </Section>
  </footer>
</template>
