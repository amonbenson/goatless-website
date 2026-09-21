<script setup>
import InstagramIcon from "@/assets/svg/instagram_line.svg";
import TiktokIcon from "@/assets/svg/tiktok_line.svg";
import YoutubeIcon from "@/assets/svg/youtube_line.svg";
import BackdropMedia from "@/components/BackdropMedia.vue";
import ContactSection from "@/components/ContactSection.vue";
import GoatlessLogo from "@/components/GoatlessLogo.vue";
import LegalSection from "@/components/LegalSection.vue";
import MemberSections from "@/components/MemberSections.vue";
import MusicSection from "@/components/MusicSection.vue";
import ShowsSection from "@/components/ShowsSection.vue";

const SOCIALS = [
  { icon: InstagramIcon, link: "https://www.instagram.com/goatless_official" },
  { icon: TiktokIcon, link: "https://www.tiktok.com/@goatless_official" },
  { icon: YoutubeIcon, link: "https://www.youtube.com/@goatless_official" },
];
</script>

<template>
  <BackdropMedia
    class="pointer-events-none fixed inset-0 -z-10 print:hidden"
  />

  <header>
    <h1 class="mb-4 hidden w-full text-center print:block">
      GOATLESS
    </h1>
    <GoatlessLogo class="z-50 print:hidden" />
  </header>

  <main class="space-y-8">
    <div
      id="scroll-placeholder"
      class="h-screen print:hidden"
    />

    <ShowsSection />

    <MusicSection />

    <ContactSection />

    <MemberSections />

    <LegalSection />
  </main>

  <footer>
    <div class="bg-blob fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center justify-end gap-2">
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
          class="size-6"
        />
      </a>
    </div>
  </footer>
</template>
