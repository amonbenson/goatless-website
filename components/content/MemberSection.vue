<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useIntersectionObserver } from "@/composables/useIntersectionObserver";

const { image } = defineProps({
  title: String,
  image: String,
  justify: {
    type: String,
    default: "start"
  }
});

const backgroundImage = useState("backgroundImage");

function onIntersect() {
  backgroundImage.value = image;
}
const { observe, unobserve } = useIntersectionObserver(onIntersect, { threshold: 0.5 });

const memberSection = ref(null);

onMounted(() => {
  if (memberSection.value) {
    observe(memberSection.value);
  }
});

onUnmounted(() => {
  if (memberSection.value) {
    unobserve(memberSection.value);
  }
});
</script>

<template>
  <div ref="memberSection" :class="`sm:h-screen flex justify-${justify} items-center`">
    <div class="w-full md:w-1/2 mb-64">
      <ProseH2 :id="title">
        {{ title }}
      </ProseH2>
      <slot />
    </div>
  </div>
</template>
