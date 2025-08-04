<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";

import GoatlessLogo from "@/components/GoatlessLogo.vue";
import ShowsSection from "@/components/ShowsSection.vue";
import ContactSection from "@/components/ContactSection.vue";
import MemberSections from "@/components/MemberSections.vue";
</script>

<template>
  <header>
    <GoatlessLogo />
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
      title="Website Owner / Responsible for Content"
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
