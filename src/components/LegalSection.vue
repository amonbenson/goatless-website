<script setup>
import Section from "./Section.vue";
import GoatlessLogoSvg from "@/assets/svg/goatless_logo.svg";
</script>

<template>
  <Section
    title="Impressum"
    section-id="legal"
    data-backdrop-media=""
    data-backdrop-opacity="0"
  >
    <p class="select-text">
      Website Owner: Amon Benson
    </p>
    <p>
      Teltower Damm 228<br>
      14167 Berlin
    </p>
    <p>
      Phone: <a href="tel:+491622108093">+49 162 2108093</a><br>
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
</template>
