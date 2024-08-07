<script setup lang="ts">
import { computed } from "vue";
import type { RouteLocationRaw } from "vue-router";
import ButtonLink from "./ButtonLink.vue";

const { event, weak } = defineProps<{
  event: {
    Date: string;
    Venue: string;
    ButtonLabel?: string;
    ButtonLink?: string;
    Image?: string;
  };
  weak?: boolean;
}>();

const buttonEnabled = computed(() => !weak && event.ButtonLabel && event.ButtonLink);

const backgroundImage = computed(() => {
  if (event.Image && !weak) {
    return [
      "linear-gradient(135deg, rgb(var(--background-rgb) / 0.9), rgb(var(--background-rgb) / 0.5))",
      `url('${event.Image}')`
    ].join(", ");
  }
  else {
    return "none";
  }
});
</script>

<template>
  <div
    class="relative flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-4 py-8 min-h-28 overflow-hidden bg-center bg-cover"
    :class="weak ? 'border-background-shade border-2' : 'bg-background-shade'"
    :style="reactive({ backgroundImage })"
  >
    <!-- Date -->
    <div class="flex justify-center items-center w-48">
      <p class="text-lg">
        {{ new Intl.DateTimeFormat().format(new Date(event.Date)) }}
      </p>
    </div>

    <!-- Venue -->
    <div class="mx-2 text-lg font-bold text-center">
      {{ event.Venue }}
    </div>

    <!-- Info / Ticket Button -->
    <div
      :class="buttonEnabled ? 'flex' : 'hidden'"
      class="md:flex justify-center items-center w-48"
    >
      <ButtonLink
        v-if="buttonEnabled"
        class="w-32"
        :to="event.ButtonLink as RouteLocationRaw"
        new-tab
      >
        {{ event.ButtonLabel }}
      </ButtonLink>
    </div>
  </div>
</template>
