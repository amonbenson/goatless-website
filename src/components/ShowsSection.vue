<script setup>
import { ref, onMounted } from "vue";
import { getEvents } from "@/api";
import Section from "./Section.vue";
import Event from "./Event.vue";

const events = ref(null);

onMounted(async () => {
  events.value = await getEvents();
});
</script>

<template>
  <Section
    title="Upcoming Shows"
    section-id="shows"
    backdrop-media="/videos/heroBackdrop.mp4"
    :backdrop-opacity="0.2"
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
