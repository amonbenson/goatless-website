<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const triggerElements = ref([]);
const currentTriggerElement = ref(null);

const mediaType = ref("none"); // "none", "image", or "video"

// store two image urls and toggle between them to allow for smooth transitions
const opacity = ref(0.1);
const videoUrl = ref(null);
const imageUrlA = ref(null);
const imageUrlB = ref(null);
const originA = ref("center");
const originB = ref("center");
const imageSelector = ref(false);

function getViewElement(nodeList) {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  let maxVisibleArea = 0;
  let mostVisibleEl = null;

  nodeList.forEach(el => {
    const rect = el.getBoundingClientRect();

    // Skip if completely out of view
    if (rect.bottom <= 0 || rect.top >= viewportHeight) return;

    const visibleTop = Math.max(rect.top, 0);
    const visibleBottom = Math.min(rect.bottom, viewportHeight);
    const visibleHeight = visibleBottom - visibleTop;
    const visibleWidth = Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0));

    const visibleArea = visibleHeight * visibleWidth;

    if (visibleArea > maxVisibleArea) {
      maxVisibleArea = visibleArea;
      mostVisibleEl = el;
    }
  });

  return mostVisibleEl;
}

function handleScroll() {
  // set the "nearest" element as the new trigger
  const el = getViewElement(triggerElements.value);
  if (currentTriggerElement.value === el) {
    return;
  }

  currentTriggerElement.value = el;

  // get the backdrop media attributes
  const media = el.dataset.backdropMedia;
  const origin = el.dataset.backdropOrigin ?? "center";
  opacity.value = Number(el.dataset.backdropOpacity ?? 1.0);

  // update the backdrop media
  if (!media) {
    mediaType.value = "none";
    return;
  }

  // check extension to determine if media is a video or image
  const extension = media.split(".").pop();
  if (extension === "mp4") {
    mediaType.value = "video";

    // set video url
    videoUrl.value = media;
  } else {
    mediaType.value = "image";

    // toggle between image A and B
    if (imageSelector.value) {
      imageUrlB.value = media;
      originB.value = origin;
    } else {
      imageUrlA.value = media;
      originA.value = origin;
    }

    // toggle image selector
    imageSelector.value = !imageSelector.value;
  }
}

onMounted(() => {
  triggerElements.value = document.querySelectorAll("[data-backdrop-media]");

  document.addEventListener("scroll", handleScroll);
  handleScroll();
});

onBeforeUnmount(() => {
  document.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="bg-black">
    <!-- Background Video -->
    <video
      v-if="videoUrl"
      class="absolute inset-0 w-screen h-screen object-cover object-center transition-opacity duration-500 motion-reduce:hidden"
      :class="mediaType === 'video' ? 'opacity-100' : 'opacity-0'"
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
      class="absolute -inset-1/2 bg-cover bg-fixed transition-opacity duration-500"
      :class="{
        'opacity-100': mediaType === 'image',
        'opacity-0': !(mediaType === 'image'),
        'bg-center': originA === 'center',
        'bg-[25%_center]': originA === 'left',
        'bg-[75%_center]': originA === 'right',
      }"
      :style="{
        backgroundImage: imageUrlA ? `url(${imageUrlA})` : 'none',
      }"
    />

    <!-- Background Image B -->
    <div
      class="absolute -inset-1/2 bg-cover bg-fixed transition-opacity duration-500"
      :class="{
        'opacity-100': mediaType === 'image' && !imageSelector,
        'opacity-0': !(mediaType === 'image' && !imageSelector),
        'bg-center': originB === 'center',
        'bg-[25%_center]': originB === 'left',
        'bg-[75%_center]': originB === 'right',
      }"
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
