<script setup>
import ScrollContainer from "./ScrollContainer.vue";
import NavItem from "./NavItem.vue";

const items = [
  { text: "contact", to: "/shows" },
  { text: "legal", to: "/members" },
];

const socials = {
  instagram: "https://www.instagram.com",
  tiktok: "https://www.tiktok.com",
  youtube: "https://www.youtube.com",
};
</script>

<template>
  <ScrollContainer is="header">
    <nav class="w-full h-12 flex items-center justify-between">
      <ul class="h-full flex items-center justify-center space-x-12">
        <NavItem
          is="li"
          v-for="{ text, to } in items"
          :key="text"
          :text="text"
          :to="to"
        />
      </ul>
      <ul class="h-full flex items-center justify-center space-x-4">
        <NavItem
          is="li"
          :to="socials.instagram"
        >
          <i-iconoir-instagram
            width="24"
            height="24"
          />
        </NavItem>
        <NavItem
          is="li"
          :to="socials.tiktok"
        >
          <i-iconoir-tiktok
            width="24"
            height="24"
          />
        </NavItem>
        <NavItem
          is="li"
          :to="socials.youtube"
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
