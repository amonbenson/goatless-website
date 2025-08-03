<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";

import CrosswordLogo from "@/components/CrosswordLogo.vue";
import ShowsSection from "@/components/ShowsSection.vue";
import ContactSection from "@/components/ContactSection.vue";
import Section from "@/components/Section.vue";

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

function handleScroll() {
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
    onUpdate: () => {
      const progress = timeline.progress();
    },
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
    <div id="navbar" class="fixed w-screen flex justify-center items-stretch bg-black py-4">
      <h1 class="-mb-4">
        <a
          class="plain-link"
          href="#"
        >
          <span
            v-for="char, i in 'GOATLESS'"
            class="logo-letter-header"
            :key="i"
          >
            {{ char }}
          </span>
        </a>
      </h1>
    </div>

    <!-- Logo Container -->
    <div id="crossword-logo-container" class="fixed inset-0 flex justify-center items-center">
      <CrosswordLogo />
    </div>

    <!-- Tween Elements -->
    <div
      v-for="char, i in 'GOATLESS'"
      class="fixed font-title leading-none pointer-events-none logo-letter-tween z-50"
      :key="i"
    >
      {{ char }}
    </div>
  </header>

  <main class="space-y-8">
    <div id="scroll-placeholder" class="h-screen" />

    <ShowsSection
      section-id="shows"
    />

    <ContactSection
      section-id="contact"
    />

    <Section
      title="Go(&oslash;)dy &centerdot; Lead Singer"
      align-left
      fill-screen
      section-id="goody"
    >
      <p>
        Rapper or singer? You decide! He won't.
      </p>
      <p>
        Born in 1999, Go(&oslash;)dy has been singing since he was two years old. At the
        age of three he joined the children's choir and at the age of 8 he was on the
        first musical stage. In 2011 he was the youngest member of the Wilmacoustix and
        after a year's break he refounded the band again in 2015 together with Björn. He
        also met Amon in the same year. They made music with Amon under the names Radix
        L$D and Dup Steppas until he began writing songs and music himself in 2018. When
        the bands merged and Goatless was founded, he also took on smaller acts and
        instruments. He also created the goodflegel label with Amon in 2019.
      </p>
      <p>
        He usually behaves very inconspicuously.
      </p>
    </Section>

    <Section
      title="Lukas &centerdot; Bassist"
      align-right
      fill-screen
      section-id="lukas"
    >
      <p>
        Born in 2003, Lukas has been playing guitar for 13 years and bass for over 6
        years. Lukas had his first band in elementary school with his brothers before
        joining the Wilmacoustics in high school. After 7Strokes and Safecall, Lukas has
        been a member of Goatless since the beginning. Since this year he also has the
        new name Sexy Bass.
      </p>
    </Section>

    <Section
      title="Amon &centerdot; Keyboarder"
      align-left
      fill-screen
      section-id="amon"
    >
      <p>
        Born in 2000, Amon has been playing the piano since he was 7 years old and
        started singing in 2012. He has been producing and writing his own music under
        the name Schlegelflegel since 2015 and met Go(&oslash;)dy in the same year. They
        appeared on stage together for the first time under their own names. After
        collaborating in their project Radix L$D, they founded the band Dup Steppas
        in 2017. Following several appearances with the 7strokes and the Wilmacoustics,
        he remains one of the founding fathers of Goatless.
      </p>
    </Section>

    <Section
      title="Nico &centerdot; Guitarist"
      align-right
      fill-screen
      section-id="nico"
    >
      <p>
        Born in 2001 in Berlin, Nico has been playing the guitar for over 13 years. He
        began his musical journey with his school band, LOUNGE ACT. Alongside that, he
        joined Björn in the project 7Strokes. Since 2020, Nico has been a part of
        Goatless, where he brings deep emotion to every string he touches &mdash; you
        can feel that. He lets his babies cry and sing.
      </p>
    </Section>

    <Section
      title="Björn &centerdot; Drummer"
      align-left
      fill-screen
      section-id="bjoern"
    >
      <p>
        Born in 1998 and a Berlin native, Björn has been playing the drums for over 15
        years, breaking countless sticks along the way. He founded his first band,
        Jigsaw, in 2013 and was an integral part of his school band, Wilmacoustix. Björn
        later teamed up with Go(&oslash;)dy and Amon for their debut collaboration, Dup
        Steppas. Juggling multiple projects, he played in two bands simultaneously until
        they merged to form Goatless.
      </p>
      <p>
        Outside of music, Björn has a passion for boxing and traveling. Recognized as
        one of the greatest drummers on the planet, he never misses a beat.
      </p>
    </Section>
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
        <a href="https://github.com/amonbenson/goatless-website" target="_blank" rel="noopener noreferrer">No goats were harmed during the making of this website.</a>
      </p>
    </Section>
  </footer>
</template>
