<script setup>
import { ref, watch } from "vue";
import ScrollContainer from "./ScrollContainer.vue";

defineProps({
  headerItems: { type: Array, required: true },
  footerItems: { type: Array, required: true },
  socials: { type: Object, required: true },
});

const menuOpen = defineModel("menuOpen", { type: Boolean });
const menuOpenDelayed = ref(false);

watch(menuOpen, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      menuOpenDelayed.value = true;
    }, 1); // Delay to allow transition to start
  } else {
    setTimeout(() => {
      menuOpenDelayed.value = false;
    }, 500); // Delay to allow transition to complete
  }
});
</script>
<template>
  <ScrollContainer
    v-if="menuOpen || menuOpenDelayed"
    class="bg-darker/50 backdrop-blur-3xl select-none transition-opacity duration-500"
    :class="menuOpen && menuOpenDelayed
      ? 'pointer-events-auto opacity-100'
      : 'pointer-events-none opacity-0'"
    @click="menuOpen = false"
  >
    <nav class="size-full flex flex-col px-4 py-16 items-center justify-center gap-12">
      <ul class="flex flex-col items-center justify-center text-center gap-4">
        <NavItem
          is="li"
          v-for="{ text, to } in headerItems"
          :key="text"
          :to="to"
        >
          {{ text }}
        </NavItem>
      </ul>

      <!-- <div class="w-32 h-px bg-light/50 rounded-full" /> -->

      <ul class="flex flex-col items-center justify-center text-center gap-4">
        <NavItem
          is="li"
          v-for="{ text, to } in footerItems"
          :key="text"
          :to="to"
        >
          {{ text }}
        </NavItem>
      </ul>

      <ul class="flex items-center justify-center gap-4">
        <NavItem
          is="li"
          :to="socials.instagram"
          external
        >
          <i-mingcute-instagram-line
            width="24"
            height="24"
          />
        </NavItem>
        <NavItem
          is="li"
          :to="socials.tiktok"
          external
        >
          <i-mingcute-tiktok-line
            width="24"
            height="24"
          />
        </NavItem>
        <NavItem
          is="li"
          :to="socials.youtube"
          external
        >
          <i-mingcute-youtube-line
            width="24"
            height="24"
          />
        </NavItem>
      </ul>
    </nav>
  </ScrollContainer>
</template>
