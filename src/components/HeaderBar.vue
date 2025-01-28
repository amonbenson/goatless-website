<script setup>
import ScrollContainer from "./ScrollContainer.vue";
import HeaderBanner from "./HeaderBanner.vue";
import HeaderItem from "./HeaderItem.vue";
</script>

<template>
  <ScrollContainer is="header">
    <nav class="w-full h-12">
      <ul class="w-full h-full flex items-center justify-start space-x-8">
        <HeaderBanner />
        <HeaderItem
          text="shows"
          to="/shows"
        />
        <HeaderItem
          text="members"
          to="/members"
        />
      </ul>
    </nav>
  </ScrollContainer>
</template>
