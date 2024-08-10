<script setup>
import { computed } from "vue";
import ShowCard from "./ShowCard.vue";

const props = defineProps({
  shows: { type: Array, required: true },
  filter: {
    type: String,
    default: "all"
  },
  emptyMessage: {
    type: String,
    default: "No shows"
  },
  weak: Boolean
});

const filteredShows = computed(() => {
  if (!props.shows) {
    return [];
  }

  const today = new Date().setHours(0, 0, 0, 0);
  const sortedShows = props.shows.slice().sort((a, b) => new Date(a.date) - new Date(b.date));

  switch (props.filter) {
    case "upcoming":
      return sortedShows.filter(show => new Date(show.date) >= today);
    case "past":
      return sortedShows.filter(show => new Date(show.date) < today);
    case "all":
      return sortedShows;
    default:
      throw new Error(`Invalid filter: ${filter}`);
  }
});
</script>

<template>
  <slot name="heading" />

  <ShowCard
    v-for="show in filteredShows"
    :key="show.date"
    v-bind="show"
    :weak="props.weak"
  />
  <p v-if="!filteredShows.length" class="text-center text-foreground-weak text-lg">
    {{ props.emptyMessage }}
  </p>
</template>
