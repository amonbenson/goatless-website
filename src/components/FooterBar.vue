<script setup>
import ScrollContainer from "./ScrollContainer.vue";
import NavItem from "./NavItem.vue";

const GITHUB_LINK = import.meta.env.VITE_FOOTER_GITHUB_LINK;

const items = [
  { text: "contact", to: "/contact" },
  { text: "legal", to: "/legal" },
];

const socials = {
  instagram: "https://www.instagram.com/goatless_official",
  tiktok: "https://www.tiktok.com/@goatless_official",
  youtube: "https://www.youtube.com/@goatless_official",
};
</script>

<template>
  <ScrollContainer
    is="header"
    class="bg-darker/95 backdrop-blur-xl"
  >
    <nav class="size-full flex items-center justify-between">
      <ul class="h-full flex items-center justify-center space-x-4">
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

      <ul class="h-full flex items-center justify-center space-x-12">
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
        powered by no goats
      </NavItem>
    </nav>
  </ScrollContainer>
</template>
