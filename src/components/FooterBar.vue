<script setup>
import ScrollContainer from "./ScrollContainer.vue";
import NavItem from "./NavItem.vue";

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
  <ScrollContainer is="header">
    <nav class="w-full h-12 flex items-center justify-center sm:justify-between">
      <ul class="h-full hidden sm:flex items-center justify-center space-x-12">
        <NavItem
          is="li"
          v-for="{ text, to } in items"
          :key="text"
          :to="to"
        >
          {{ text }}
        </NavItem>
      </ul>
      <ul class="h-full flex items-center justify-center space-x-4">
        <NavItem
          is="li"
          :to="socials.instagram"
          external
        >
          <i-iconoir-instagram
            width="24"
            height="24"
          />
        </NavItem>
        <NavItem
          is="li"
          :to="socials.tiktok"
          external
        >
          <i-iconoir-tiktok
            width="24"
            height="24"
          />
        </NavItem>
        <NavItem
          is="li"
          :to="socials.youtube"
          external
        >
          <i-iconoir-youtube
            width="24"
            height="24"
          />
        </NavItem>
      </ul>
    </nav>
  </ScrollContainer>
</template>
