<script setup>
import ScrollContainer from "./ScrollContainer.vue";
import HeaderBanner from "./HeaderBanner.vue";
import NavItem from "./NavItem.vue";

const items = [
  { text: "shows", to: "/shows" },
  { text: "members", to: "/members" },
];

const menuOpen = defineModel("menuOpen", { type: Boolean });
</script>

<template>
  <ScrollContainer is="header">
    <nav class="relative w-full h-12 flex items-center justify-between">
      <div class="sm:hidden w-8 h-full" />
      <HeaderBanner />
      <ul class="h-full hidden sm:flex items-center justify-end space-x-12">
        <NavItem
          is="li"
          v-for="{ text, to } in items"
          :key="text"
          :to="to"
        >
          {{ text }}
        </NavItem>
      </ul>
      <div class="sm:hidden w-8 h-full overflow-visible flex items-center justify-end">
        <button
          class="w-8 h-8 cursor-pointer relative"
          @click="menuOpen = !menuOpen"
        >
          <i-iconoir-menu
            class="absolute left-1/2 top-1/2 -translate-1/2 size-6 transition-all duration-500"
            :class="menuOpen ? 'opacity-0 rotate-45' : 'opacity-100'"
            :width="undefined"
            :height="undefined"
          />
          <i-iconoir-xmark
            class="absolute left-1/2 top-1/2 -translate-1/2 size-8 transition-all duration-500"
            :class="menuOpen ? 'opacity-100' : 'opacity-0 -rotate-45'"
            :width="undefined"
            :height="undefined"
          />
        </button>
      </div>
    </nav>
  </ScrollContainer>
</template>
