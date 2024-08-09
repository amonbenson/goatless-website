<script setup>
const videoTypes = ["mp4", "webm", "ogg"];

const url = useState("backdropMedia", () => null);
const opacity = useState("backdropOpacity", () => 0.15);

// reset backdrop on route change
const router = useRouter();
router.beforeEach(() => {
  url.value = null;
  opacity.value = 0.15;
});

// determine media type from extension
const mediaType = computed(() => {
  if (!url.value) return "none";

  // check extension to determine if media is a video or image
  const extension = url.value.split(".").pop();
  if (videoTypes.includes(extension)) return "video";
  else return "image";
})
</script>

<template>
  <div class="bg-background">
    <!-- Background Image -->
    <div
      v-if="mediaType === 'image'"
      class="absolute inset-0 bg-center bg-cover bg-fixed"
      :style="{
        backgroundImage: url ? `url(${url})` : 'none',
        transition: 'background-image 300ms ease-in-out',
      }"
    />

    <!-- Dark Overlay -->
    <div
      class="absolute inset-0 bg-background"
      :style="{ opacity: 1 - opacity }"
    />
  </div>
</template>
