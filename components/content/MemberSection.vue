<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useIntersectionObserver } from "@/composables/useIntersectionObserver";

const { image } = defineProps({
  image: String,
  rtl: Boolean
});

const backdropMedia = useState("backdropMedia");
const backdropOpacity = useState("backdropOpacity", () => 0.15);

function onIntersect() {
  backdropMedia.value = image;
  backdropOpacity.value = 0.5;
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
    <div ref="contentElement" class="w-full md:w-1/2 mb-64">
      <ContentSlot />
    </div>
  </div>
</template>
