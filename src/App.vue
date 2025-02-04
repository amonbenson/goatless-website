<script setup>
import HeaderBar from "@/components/HeaderBar.vue";
import ScrollContainer from "@/components/ScrollContainer.vue";
import FooterBar from "@/components/FooterBar.vue";
</script>

<template>
  <HeaderBar class="flex-none" />

  <ScrollContainer
    is="main"
    class="flex-1"
  >
    <div class="w-full min-h-full py-8 flex items-center justify-center">
      <RouterView class="w-full" />
    </div>
  </ScrollContainer>

  <FooterBar class="flex-none" />
</template>
