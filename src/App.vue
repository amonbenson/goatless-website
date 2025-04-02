<script setup>
import HeaderBar from "@/components/HeaderBar.vue";
import ScrollContainer from "@/components/ScrollContainer.vue";
import FooterBar from "@/components/FooterBar.vue";
</script>

<template>
  <BackdropMedia
    class="fixed inset-0 pointer-events-none -z-10"
  />

  <HeaderBar class="fixed left-0 top-0 w-full h-12 z-30" />

  <ScrollContainer
    is="main"
    class="w-screen h-screen"
  >
    <div class="w-full min-h-full pt-20 pb-16 flex items-center justify-center">
      <RouterView class="w-full" />
    </div>
  </ScrollContainer>

  <FooterBar class="hidden sm:block fixed left-0 bottom-0 w-full h-8 z-30" />
</template>
