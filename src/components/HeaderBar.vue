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
  <ScrollContainer
    is="header"
    class="bg-darker/90 backdrop-blur-xl"
  >
    <nav class="size-full flex items-center justify-between sm:justify-center space-x-12">
      <div class="sm:hidden size-8 h-full" />
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
          class="size-8 cursor-pointer relative"
          @click="menuOpen = !menuOpen"
        >
          <i-mingcute-menu-line
            class="absolute left-0 top-0 size-full transition-all duration-500"
            :class="menuOpen ? 'opacity-0 rotate-45' : 'opacity-100'"
          />
          <i-mingcute-close-line
            class="absolute left-0 top-0 size-full transition-all duration-500"
            :class="menuOpen ? 'opacity-100' : 'opacity-0 -rotate-45'"
          />
        </button>
      </div>
    </nav>
  </ScrollContainer>
</template>
