<script setup lang="ts">
import NavLink from "./NavLink.vue";
import Banner from "./Banner.vue";

const { links } = defineProps<{
  links: { to: string; label: string }[];
}>();

const menuOpen = defineModel<boolean>("menuOpen");
</script>

<template>
  <header class="bg-background/75 backdrop-blur-xl w-full h-14 flex justify-between sm:justify-center items-center space-x-4 sm:space-x-8 lg:space-x-16 px-4">
    <!-- Menu counterweight -->
    <div class="h-full w-12 sm:hidden" />

    <!-- Banner logo -->
    <NavLink
      class="h-full min-w-0 shrink flex items-center"
      to="/"
      @click="menuOpen = false"
    >
      <Banner id="nav-banner" class="h-8" />
    </NavLink>

    <!-- Nav links -->
    <nav class="h-full hidden sm:flex items-center space-x-8 lg:space-x-16">
      <NavLink
        v-for="{ to, label } in links"
        :key="to"
        :to="to"
        class="py-4 text-lg"
      >
        {{ label }}
      </NavLink>
    </nav>

    <!-- Hamburger menu button -->
    <button class="h-full w-12 shrink-0 flex sm:hidden justify-center items-center" @click="menuOpen = !menuOpen">
      <Icon v-if="!menuOpen" name="clarity:menu-line" size="2.0rem" />
      <Icon v-else name="clarity:close-line" size="2.0rem" />
    </button>
  </header>
</template>
