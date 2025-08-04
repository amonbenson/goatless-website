<script setup>
import { ref, onMounted } from "vue";
import { getEvents } from "@/api";
import Section from "./Section.vue";
import Event from "./Event.vue";

const events = ref(null);

onMounted(async () => {
  events.value = await getEvents();
  console.log(events.value);
});
</script>

<template>
  <Section
    title="Upcoming Shows"
    section-id="shows"
    fill-screen
  >
    <Event
      v-for="event in events"
      :key="event.id"
      class="w-full"
      :event="event"
    />

    <p
      v-if="events && events.length === 0"
      class="text-center"
    >
      <i>There are currently no shows planned.</i>
    </p>
  </Section>
</template>
