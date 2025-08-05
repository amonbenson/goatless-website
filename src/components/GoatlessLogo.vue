<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import LogoSvg from "@/assets/svg/goatless_logo.svg";

const OPACITY_THRESHOLD = 0.75;
const SCROLL_HEIGHT_FACTOR = 0.95;

let timeline = null;
const showColumns = ref(true);

const columns = [
  { letter: "G" },
  { letter: "O", top: "SH", bottom: "WS", link: "#shows" },
  { letter: "A" },
  { letter: "T", top: "CON", bottom: "ACT", link: "#contact" },
  { letter: "L" },
  { letter: "E", top: "LIN", bottom: "UP", link: "#goody" },
  { letter: "S" },
  { letter: "S" },
  // { letter: "S", top: "MU", bottom: "IC" },
  // { letter: "S", top: "IMPRE", bottom: "SUM", link: "#legal" },
];

function setupAnimation() {
  // kill old timeline
  if (timeline) {
    timeline.kill();
  }

  const logoContainer = document.getElementById("gl-logo-container");
  const logo = document.getElementById("gl-logo");
  const linkLetters = document.querySelectorAll(".gl-logo-link-letter");

  // animate all elements
  timeline = gsap.timeline({ paused: true });
  timeline.fromTo(logoContainer, {
    height: "100vh",
  }, {
    height: "5rem",
    duration: 1,
    ease: "none",
  }, 0);
  timeline.fromTo(logo, {
    scale: Math.min(window.innerWidth / logo.clientWidth * 0.8, window.innerHeight / logo.clientHeight * 0.2),
    opacity: 1,
  }, {
    scale: 1,
    opacity: 1,
    duration: 1,
    ease: "none",
  }, 0);
  linkLetters.forEach(el => timeline.fromTo(el, {
    opacity: 1,
  }, {
    opacity: 0,
    duration: OPACITY_THRESHOLD,
    ease: "none",
  }, 0));

  // apply initial scroll value
  handleScroll();
}

function handleScroll() {
  // calculate progress based on scroll position
  const progress = Math.min(1, window.scrollY / (window.innerHeight * SCROLL_HEIGHT_FACTOR));

  // set timeline progress
  timeline.progress(progress);

  // toggle show columns variable
  showColumns.value = progress < OPACITY_THRESHOLD;
}

function handleResize() {
  // recreate the animation when the window size changes
  setupAnimation();
}

onMounted(() => {
  document.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
  setupAnimation();
});

onBeforeUnmount(() => {
  timeline.kill();
  document.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div class="fixed w-screen">
    <div
      id="gl-logo-container"
      class="fixed left-0 top-0 w-screen h-screen pointer-events-none"
      data-backdrop-media="/videos/heroBackdrop.mp4"
      :data-backdrop-opacity="0.2"
    >
      <h1
        id="gl-logo"
        class="overflow-visible absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto bg-blob"
      >
        <a
          class="text-white"
          :href="showColumns ? undefined: '#'"
        >
          <component
            :is="column.link ? 'a' : 'span'"
            v-for="column, x in columns"
            :key="x"
            :href="column.link && showColumns ? column.link : undefined"
            class="gl-logo-letter inline-block relative text-white transition-colors"
            :class="{
              'hover:text-red-lighter': column.link && showColumns,
            }"
          >
            <LogoSvg
              v-if="column.letter === 'O'"
              class="inline-block w-[0.95em] -translate-y-[0.2em] mx-[-0.1em]"
            />
            <template v-else>
              {{ column.letter }}
            </template>
            <span
              v-for="topLetter, y in column.top?.split('').reverse().join('') ?? []"
              :key="y"
              class="gl-logo-link-letter text-[40%] absolute left-1/2 top-1/2"
              :style="{
                transform: `translate(-50%, calc(-205% - 80% * ${y}))`,
              }"
            >
              {{ topLetter }}
            </span>
            <span
              v-for="bottomLetter, y in column.bottom ?? []"
              :key="y"
              class="gl-logo-link-letter text-[40%] absolute left-1/2 top-1/2"
              :style="{
                transform: `translate(-50%, calc(65% + 80% * ${y}))`,
              }"
            >
              {{ bottomLetter }}
            </span>
          </component>
        </a>
      </h1>
    </div>
  </div>
</template>
