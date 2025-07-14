<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useIntersectionObserver } from "@/composables/intersectionObserver";
import { useBackdropStore } from "@/store/backdrop";
import UiVSpace from "./UiVSpace.vue";

const backdropStore = useBackdropStore();

const { image } = defineProps({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: [String, null], default: null },
  rtl: Boolean,
});

function onIntersect() {
  backdropStore.setMedia(image, 0.2);
}

const { observe, unobserve } = useIntersectionObserver(onIntersect, { threshold: 0.5 });

const sectionElement = ref(null);
const contentElement = ref(null);

onMounted(() => {
  if (sectionElement.value) {
    observe(sectionElement.value);
  }
});

onUnmounted(() => {
  if (sectionElement.value) {
    unobserve(memberSection.value);
  }
});

// if the route updates within the same page (e. g. by clicking on a nav anchor), update the intersection manually
onBeforeRouteUpdate((to) => {
  if (to.path.endsWith("members")) {
    // check if the top of the section is within the viewport
    const { top } = contentElement.value.getBoundingClientRect();
    if (top >= 0 && top <= window.innerHeight) {
      onIntersect();
    }
  }
});
</script>

<template>
  <div
    ref="sectionElement"
    class="min-h-screen flex items-center"
    :class="rtl ? 'justify-end' : 'justify-start'"
  >
    <div
      ref="contentElement"
      class="w-full md:w-1/2 mb-64"
    >
      <h2>
        {{ name }}
      </h2>
      <p class="opacity-50">
        {{ role }}
      </p>

      <UiVSpace />

      <slot />
    </div>
  </div>
</template>
