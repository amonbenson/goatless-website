<script setup>
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

    <LegalSection />
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
