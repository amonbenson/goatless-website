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
    <article class="space-y-8">
      <RouterView />
    </article>
  </ScrollContainer>

  <FooterBar class="flex-none" />
</template>
