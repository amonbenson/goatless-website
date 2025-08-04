<script setup>
import { ref, watch } from "vue";
import { useBackdropStore } from "@/store/backdrop";
import { storeToRefs } from "pinia";

const backdropStore = useBackdropStore();
const { url, opacity } = storeToRefs(backdropStore);

// store two image urls and toggle between them to allow for smooth transitions
const videoUrl = ref(null);
const imageUrlA = ref(null);
const imageUrlB = ref(null);
const imageSelector = ref(false);

const mediaType = ref("none"); // "none", "image", or "video"

// reset backdrop on route change
// const router = useRouter();
// router.beforeEach(() => {
//   backdropStore.$reset();
// });

// handle url change
watch(url, (urlValue) => {
  if (!urlValue) {
    mediaType.value = "none";
    return;
  }

  // check extension to determine if media is a video or image
  const extension = urlValue.split(".").pop();
  if (extension === "mp4") {
    mediaType.value = "video";

    // set video url
    videoUrl.value = urlValue;
  } else {
    mediaType.value = "image";

    // toggle between image A and B
    if (imageSelector.value) {
      imageUrlB.value = urlValue;
    } else {
      imageUrlA.value = urlValue;
    }

    // toggle image selector
    imageSelector.value = !imageSelector.value;
  }
});
</script>

<template>
  <div class="bg-background">
    <!-- Background Video -->
    <video
      v-if="videoUrl"
      class="absolute inset-0 w-screen h-screen object-cover object-center"
      autoplay
      loop
      muted
      playsinline
    >
      <source
        :src="videoUrl"
        type="video/mp4"
      >
    </video>

    <!-- Background Image A -->
    <div
      class="absolute inset-0 bg-center bg-cover bg-fixed transition-opacity duration-500"
      :class="mediaType === 'image' ? 'opacity-100' : 'opacity-0'"
      :style="{
        backgroundImage: imageUrlA ? `url(${imageUrlA})` : 'none',
      }"
    />

    <!-- Background Image B -->
    <div
      class="absolute inset-0 bg-center bg-cover bg-fixed transition-opacity duration-500"
      :class="mediaType === 'image' && !imageSelector ? 'opacity-100' : 'opacity-0'"
      :style="{
        backgroundImage: imageUrlB ? `url(${imageUrlB})` : 'none',
      }"
    />

    <!-- Dark Overlay -->
    <div
      class="absolute -inset-1/2 bg-black transition-opacity duration-500"
      :style="{ opacity: 1 - (opacity * (mediaType === 'none' ? 0 : 1)) }"
    />
  </div>
</template>
