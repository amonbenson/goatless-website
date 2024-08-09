<script setup>
import { onMounted } from "vue";

const backdropMedia = useState("backdropMedia");

onMounted(async () => {
  backdropMedia.value = "/images/hero.jpg";
});
</script>

<template>
  <ContentDoc />
</template>
