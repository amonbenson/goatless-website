---
title: Shows
---

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useBackdropStore } from "@/store/backdrop";

const backdropStore = useBackdropStore();
const api_base_url = import.meta.env["VITE_API_BASE_URL"] ?? null;

const events = ref("loading");

onMounted(() => {
  backdropStore.setMedia("/videos/heroBackdrop.mp4");
});

onMounted(async () => {
  // fetch upcoming events
  try {
    const res = await axios.get(`${api_base_url}/events`, {
      validateStatus: (status) => status === 200,
    });
    events.value = res.data.filter(event => !!event.title);
  } catch (err) {
    console.error("failed to fetch events:", err.message);
    events.value = [];
  }
});
</script>

## Upcoming Shows

<div
  v-if="events !== 'loading'"
  class="flex flex-col gap-4 py-4"
>
<div v-if="!events.length" class="italic">
No upcoming shows. <RouterLink class="italic" to="/contact">Consider booking us here.</RouterLink>
</div>

<EventCard
  v-for="event in events"
  :key="event.id"
  :event="event"
/>

</div>
