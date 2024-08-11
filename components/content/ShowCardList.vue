<script setup>
import { computed } from "vue";
import ShowCard from "./ShowCard.vue";

const props = defineProps({
  shows: { type: Array, required: true },
  filter: {
    type: String,
    default: "all"
  },
  weak: Boolean
});

const today = new Date().setHours(0, 0, 0, 0);

const filteredShows = computed(() => {
  if (!props.shows) {
    return [];
  }

  // sort by reverse date
  const sortedShows = props.shows.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  // apply filter
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
  <ShowCard
    v-for="show in filteredShows"
    :key="show.date"
    v-bind="show"
    :weak="props.weak"
  />

  <div v-if="!filteredShows.length" class="flex flex-col items-center text-foreground-weak">
    <ContentSlot :use="$slots.empty">
      No _shows_ found.
    </ContentSlot>
  </div>
</template>
