---
title: Shows
---

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useBackdropStore } from "@/store/backdrop";

const backdropStore = useBackdropStore();
const app_id = import.meta.env["VITE_BIT_API_KEY"] ?? null;
const artist_id = import.meta.env["VITE_BIT_ARTIST_ID"] ?? null;

const events = ref("loading");

onMounted(() => {
  backdropStore.setMedia("/videos/heroBackdrop.mp4");
});

onMounted(async () => {
  if (!app_id) {
    console.warn("missing app id");
    return;
  }
  if (!artist_id) {
    console.warn("missing artist id");
    return;
  }

  // fetch upcoming events
  try {
    const res = await axios.get(`https://rest.bandsintown.com/artists/id_${artist_id}/events/`, {
      params: {
        app_id,
        date: "upcoming",
      },
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
