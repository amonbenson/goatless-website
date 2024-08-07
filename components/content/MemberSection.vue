<template>
  <div :class="`sm:h-screen flex justify-${justify} items-center`" ref="memberSection">
    <div class="w-full md:w-1/2 mb-64">
      <ProseH2 :id="title">{{ title }}</ProseH2>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useIntersectionObserver } from "@/composables/useIntersectionObserver";

const { image } = defineProps({
  title: String,
  image: String,
  justify: {
    type: String,
    default: 'start',
  },
});

const backgroundImage = useState("backgroundImage");

const onIntersect = (entry) => {
  backgroundImage.value = image;
};
const { observe, unobserve } = useIntersectionObserver(onIntersect, { threshold: 0.5 });

const memberSection = ref(null);

onMounted(() => {
  memberSection.value && observe(memberSection.value);
});

onUnmounted(() => {
  memberSection.value && unobserve(memberSection.value);
});
</script>
