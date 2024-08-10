<script setup>
const url = useState("backdropMedia", () => null);
const opacity = useState("backdropOpacity", () => 0.15);

// store the last image url separately to enable a fade-out transition when the url is set to null
const lastImageUrl = ref(null);

// reset backdrop on route change
const router = useRouter();
router.beforeEach(() => {
  url.value = null;
  opacity.value = 0.15;
  lastImageUrl.value = null;
});

// determine media type from extension
const mediaType = computed(() => {
  if (!url.value) {
    return "none";
  }

  // check extension to determine if media is a video or image
  const extension = url.value.split(".").pop();
  if (extension === "mp4") {
    return "video";
  }
  else {
    return "image";
  }
});

// store the last image url
watchEffect(() => {
  if (mediaType.value === "image") {
    lastImageUrl.value = url.value;
  }
});
</script>

<template>
  <div class="bg-background">
    <!-- Background Image -->
    <div
      v-if="mediaType === 'image' || mediaType === 'none'"
      class="absolute inset-0 bg-center bg-cover bg-fixed"
      :style="{
        backgroundImage: lastImageUrl ? `url(${lastImageUrl})` : 'none',
        transition: 'background-image 300ms ease-in-out',
      }"
    />

    <!-- Background Video -->
    <video
      v-else-if="mediaType === 'video'"
      class="absolute inset-0 w-screen h-screen object-cover object-center"
      autoplay
      loop
      muted
      playsinline
    >
      <source :src="url" type="video/mp4">
    </video>

    <!-- Dark Overlay -->
    <div
      class="absolute inset-0 bg-background transition-opacity duration-300"
      :style="{ opacity: 1 - (opacity * (mediaType === 'none' ? 0 : 1)) }"
    />
  </div>
</template>
