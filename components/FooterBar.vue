<script setup lang="ts">
import NavLink from "./NavLink.vue";

const { links, socials } = defineProps<{
  links: { to: string; label: string }[];
  socials: { to: string; icon: string }[];
}>();
</script>

<template>
  <footer class="bg-background/75 backdrop-blur-xl w-full h-8 hidden sm:flex justify-center sm:justify-between items-center px-8">
    <!-- Social icons -->
    <nav class="h-full flex items-center space-x-4">
      <NavLink
        v-for="{ to, icon } in socials"
        :key="to"
        :to="to"
        new-tab
      >
        <Icon :name="icon" size="1.2rem" />
      </NavLink>
    </nav>

    <!-- Nav links -->
    <nav class="h-full hidden sm:flex items-center space-x-8 lg:space-x-16">
      <NavLink
        v-for="{ to, label } in links"
        :key="to"
        class="text-sm font-light"
        :to="to"
      >
        {{ label }}
      </NavLink>
    </nav>

    <!-- Developer credit -->
    <NavLink
      class="hidden sm:inline-block text-xs font-extralight"
      to="https://github.com/amonbenson"
      new-tab
    >
      powered by no goats
    </NavLink>
  </footer>
</template>
