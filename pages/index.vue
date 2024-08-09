<script setup>
import { onMounted } from "vue";

const backdropMedia = useState("backdropMedia");

onMounted(async () => {
  backdropMedia.value = "/videos/heroBackdrop.mp4";
});
</script>

<template>
  <ContentDoc />
</template>
