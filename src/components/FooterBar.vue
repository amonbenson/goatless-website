<script setup>
import ScrollContainer from "./ScrollContainer.vue";
import NavItem from "./NavItem.vue";

const GITHUB_LINK = import.meta.env.VITE_FOOTER_GITHUB_LINK;

defineProps({
  items: { type: Array, required: true },
  socials: { type: Object, required: true },
});
</script>

<template>
  <ScrollContainer
    is="header"
    class="bg-darker/50 backdrop-blur-3xl select-none"
  >
    <nav class="size-full flex items-center justify-between">
      <ul class="h-full flex items-center justify-center gap-4">
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

      <ul class="h-full flex items-center justify-center gap-12">
        <NavItem
          is="li"
          v-for="{ text, to } in items"
          :key="text"
          :to="to"
          small
        >
          {{ text }}
        </NavItem>
      </ul>

      <NavItem
        is="p"
        :to="GITHUB_LINK"
        external
        tiny
      >
        powered without goats
      </NavItem>
    </nav>
  </ScrollContainer>
</template>
