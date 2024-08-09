<script setup>
import { onMounted, watch } from "vue";
import Banner from "@/components/Banner.vue";

const overlayShowDuration = 2000;
const overlayTransitionDuration = 1000;

const justLanded = useState("justLanded", () => true);

const showOverlay = ref(true);

const showOverlayDelayed = ref(true);
watch(showOverlay, () => {
  setTimeout(() => {
    showOverlayDelayed.value = false;
  }, overlayTransitionDuration);
});

onMounted(() => {
  // hide overlay if we've just landed here
  if (justLanded.value) {
    justLanded.value = false;
    showOverlay.value = true;
    showOverlayDelayed.value = true;

    setTimeout(() => {
      showOverlay.value = false;
    }, overlayShowDuration);
  }
  else {
    showOverlay.value = false;
    showOverlayDelayed.value = false;
  }
});
</script>

<template>
  <div
    class="fixed left-0 top-0 w-screen h-screen bg-background z-overlay-screen transition"
    :class="{
      'bg-opacity-0': !showOverlay,
      'pointer-events-none': !showOverlay,
      [`duration-${overlayTransitionDuration}`]: true,
    }"
    @click="showOverlay = false"
    @scroll="showOverlay = false"
  />
  <div
    class="h-screen -mt-20 flex flex-col justify-center align-center z-overlay-screen pointer-events-none select-none"
    :class="{
      sticky: showOverlayDelayed,
      [`duration-${overlayTransitionDuration}`]: true,
    }"
  >
    <Banner class="w-full" />
    <h1 class="text-xl sm:text-2xl md:text-3xl text-center">
      A Band without a goat.
    </h1>
  </div>
  <!-- <div class="w-100 flex justify-center items-center">
    <Icon
      class="relative block -mt-56 rotate-180"
      name="clarity:arrow-line"
      size="2.0rem"
    />
  </div> -->
</template>
