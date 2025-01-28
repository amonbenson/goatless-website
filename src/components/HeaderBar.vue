<script setup>
import ScrollContainer from "./ScrollContainer.vue";
import HeaderBanner from "./HeaderBanner.vue";
import NavItem from "./NavItem.vue";

const items = [
  { text: "shows", to: "/shows" },
  { text: "members", to: "/members" },
];
</script>

<template>
  <ScrollContainer is="header">
    <nav class="w-full h-12 flex items-center justify-between">
      <HeaderBanner />
      <ul class="w-full h-full flex items-center justify-end space-x-12">
        <NavItem
          is="li"
          v-for="{ text, to } in items"
          :key="text"
          :text="text"
          :to="to"
        />
      </ul>
    </nav>
  </ScrollContainer>
</template>
