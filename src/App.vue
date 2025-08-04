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
import GoatlessLogoSvg from "@/assets/svg/goatless_logo.svg";

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

    <Section
      title="Website Owner"
      section-id="legal"
      backdrop-media=""
      :backdrop-opacity="0"
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
        Email: <a href="mailto:goatless.official@gmail.com">goatless.official@gmail.com</a>
      </p>

      <p class="text-center mt-32">
        <GoatlessLogoSvg class="inline-block size-64" />
      </p>
      <p class="text-center mb-64">
        <a
          href="https://github.com/amonbenson/goatless-website"
          target="_blank"
          rel="noopener noreferrer"
        >No goats were harmed during the making of this website.</a>
      </p>
    </Section>
  </main>

  <footer>
    <div class="fixed left-1/2 -translate-x-1/2 bottom-4 flex justify-end items-center gap-2 z-40 bg-blob">
      <a
        v-for="social in SOCIALS"
        :key="social.link"
        :href="social.link"
        target="_blank"
        rel="noopener noreferrer"
        class="text-white z-50"
      >
        <component
          :is="social.icon"
          class="size-6"
        />
      </a>
    </div>
  </footer>
</template>
