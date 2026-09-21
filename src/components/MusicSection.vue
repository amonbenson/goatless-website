<script setup>
import { onMounted, ref } from "vue";

import Section from "./Section.vue";
</script>

<template>
  <Section
    title="Music"
    section-id="music"
    data-backdrop-media="/videos/heroBackdrop.mp4"
    data-backdrop-opacity="0.2"
    fill-screen
  >
    <iframe
      src="https://open.spotify.com/embed/artist/6J58yaHEfHSVAiNlkpdoFp?theme=0"
      width="100%"
      height="352"
      frameborder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  </Section>
</template>
