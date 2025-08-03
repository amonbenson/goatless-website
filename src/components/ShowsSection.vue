<script setup>
import Section from "./Section.vue";

const events = [
  {
    id: 0,
    title: "Emergenza Finale",
    date: new Date("2025-07-05T18:00"),
    location: "SO36",
  },
  {
    id: 1,
    title: "Szummer Break 2025",
    date: new Date("2025-07-19T18:00"),
    location: "Strandbad Wannsee",
  },
  {
    id: 2,
    title: "50 Jahre Noteingang",
    date: new Date("2025-08-02T18:00"),
    location: "Noteingang Thielallee",
  },
];
</script>

<template>
  <Section title="Upcoming Shows">
    <div
      v-for="event in events"
      :key="event.id"
      class="w-full flex justify-center items-stretch gap-4"
    >
      <div class="flex-none w-16 flex flex-col justify-center items-center">
        <div class="font-title text-xl">
          {{
            Intl.DateTimeFormat(undefined, {
              month: "short"
            }).format(event.date)
          }}
        </div>
        <div class="font-title text-4xl opacity-muted">
          {{
            Intl.DateTimeFormat(undefined, {
              day: "numeric"
            }).format(event.date)
          }}
        </div>
      </div>

      <div class="shrink w-72 min-w-0 flex flex-col justify-start items-stretch gap-1 md:w-128 md:flex-row md:justify-start md:items-center md:gap-2">
        <h3><a class="plain-link truncate">{{ event.title }}</a></h3>
        <span class="hidden md:inline font-title text-2xl">&centerdot;</span>
        <p class="font-title text-xl opacity-muted truncate">
          <a class="plain-link">{{ event.location }}</a>
        </p>
      </div>
    </div>

    <p
      v-if="events && events.length === 0"
      class="text-center"
    >
      <i>There are currently no shows planned.</i>
    </p>
  </Section>
</template>
