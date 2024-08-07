<script setup lang="ts">
import NavLink from "./NavLink.vue";

const { headerLinks, footerLinks } = defineProps<{
  headerLinks: { to: string; label: string }[];
  footerLinks: { to: string; label: string }[];
}>();

const menuOpen = defineModel<boolean>("menuOpen");
</script>

<template>
  <div
    v-if="menuOpen"
    class="absolute left-0 top-0 w-full h-full bg-background/75 backdrop-blur-xl flex flex-col justify-center items-center space-y-4 py-16"
    @click="menuOpen = false"
  >
    <!-- Header Links -->
    <nav class="flex flex-col items-center space-y-4">
      <NavLink
        v-for="{ to, label } in headerLinks"
        :key="to"
        :to="to"
        class="text-2xl font-light"
        @click="menuOpen = false"
      >
        {{ label }}
      </NavLink>
    </nav>

    <!-- Divider -->
    <div class="w-48 border-t border-foreground-weak" />

    <!-- Footer Links -->
    <nav class="flex flex-col items-center space-y-4">
      <NavLink
        v-for="{ to, label } in footerLinks"
        :key="to"
        :to="to"
        class="text-xl font-light"
        @click="menuOpen = false"
      >
        {{ label }}
      </NavLink>
    </nav>
  </div>
</template>
