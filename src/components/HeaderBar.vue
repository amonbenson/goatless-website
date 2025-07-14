<script setup>
import ScrollContainer from "./ScrollContainer.vue";
import HeaderBanner from "./HeaderBanner.vue";
import NavItem from "./NavItem.vue";

defineProps({
  items: { type: Array, required: true },
});

const menuOpen = defineModel("menuOpen", { type: Boolean });
</script>

<template>
  <ScrollContainer
    is="header"
    class="bg-darker/50 backdrop-blur-3xl select-none"
  >
    <nav class="size-full flex items-center justify-between sm:justify-center gap-12">
      <div class="sm:hidden size-8 h-full" />
      <HeaderBanner />
      <ul class="h-full hidden sm:flex items-center justify-end gap-12">
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
