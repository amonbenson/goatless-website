<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";

import CrosswordLogo from "@/components/CrosswordLogo.vue";
import ShowsSection from "@/components/ShowsSection.vue";
import ContactSection from "@/components/ContactSection.vue";
import MemberSections from "@/components/MemberSections.vue";

let crosswordLogoContainer = null;
let sourceLetters = null;
let targetLetters = null;
let tweenLetters = null;

let scrollThreshold = 1000; // will be replaced during onMounted
let timeline = null;

function updateTimeline() {
  // calculate scroll percentage
  const scrollTop = window.scrollY;
  const progress = Math.min(scrollTop / scrollThreshold);

  // update timeline animation
  timeline.progress(progress);

  // update visibility of source, target, and tween elements
  crosswordLogoContainer.style.visibility = progress < 0.1 ? "visible" : "hidden";
  sourceLetters.forEach(el => el.style.visibility = progress <= 0.01 ? "visible" : "hidden");
  targetLetters.forEach(el => el.style.visibility = progress >= 0.99 ? "visible" : "hidden");
  tweenLetters.forEach(el => el.style.visibility = progress > 0.01 && progress < 0.99 ? "visible" : "hidden");
}

onMounted(() => {
  const scrollPlaceholder = document.getElementById("scroll-placeholder");
  const navbar = document.getElementById("navbar");
  scrollThreshold = scrollPlaceholder.getBoundingClientRect().height - navbar.getBoundingClientRect().height;

  crosswordLogoContainer = document.getElementById("crossword-logo-container");
  sourceLetters = document.querySelectorAll(".logo-letter-crossword");
  targetLetters = document.querySelectorAll(".logo-letter-header");
  tweenLetters = document.querySelectorAll(".logo-letter-tween");

  // assuming that all letters have the same size
  const sourceFontSize = parseFloat(window.getComputedStyle(sourceLetters[0], null).getPropertyValue("font-size"));
  const targetFontSize = parseFloat(window.getComputedStyle(targetLetters[0], null).getPropertyValue("font-size"));

  timeline = gsap.timeline({
    paused: true,
  });

  // move the tween letters
  for (let i = 0; i < 8; i++) {
    const sourceBounds = sourceLetters[i].getBoundingClientRect();
    const targetBounds = targetLetters[i].getBoundingClientRect();
    const tween = tweenLetters[i];

    timeline.fromTo(tween, {
      left: sourceBounds.left,
      top: sourceBounds.top,
      fontSize: sourceFontSize,
    }, {
      left: targetBounds.left,
      top: targetBounds.top,
      fontSize: targetFontSize,
      ease: "none",
    }, 0);
  }

  // hide the crossword letters
  timeline.fromTo(crosswordLogoContainer, {
    opacity: 1,
  }, {
    opacity: 0,
    ease: "none",
    duration: 0.05,
  }, 0);

  // update the progress when the page is scrolled
  window.addEventListener("scroll", updateTimeline);
  updateTimeline();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateTimeline);
});
</script>

<template>
  <header class="fixed left-0 top-0 w-screen z-40">
    <!-- Navbar Container -->
    <div
      id="navbar"
      class="fixed w-screen flex justify-center items-stretch bg-black py-4"
    >
      <h1 class="-mb-4">
        <a
          class="plain-link"
          href="#"
        >
          <span
            v-for="char, i in 'GOATLESS'"
            :key="i"
            class="logo-letter-header"
          >
            {{ char }}
          </span>
        </a>
      </h1>
    </div>

    <!-- Logo Container -->
    <div
      id="crossword-logo-container"
      class="fixed inset-0 flex justify-center items-center"
    >
      <CrosswordLogo />
    </div>

    <!-- Tween Elements -->
    <div
      v-for="char, i in 'GOATLESS'"
      :key="i"
      class="fixed font-title leading-none pointer-events-none logo-letter-tween z-50"
    >
      {{ char }}
    </div>
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
      class="mb-8"
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
