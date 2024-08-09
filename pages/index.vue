<script setup>
import { onMounted } from "vue";

const backgroundImage = useState("backgroundImage");

onMounted(async () => {
  backgroundImage.value = "/images/hero.jpg";
});
</script>

<template>
  <ContentDoc />
</template>
