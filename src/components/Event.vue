<script setup>
import { computed } from "vue";

const props = defineProps({
  event: { type: Object, required: true },
});

// extract datetime components
const datetime = computed(() => new Date(props.event.datetime));
const month = computed(() => Intl.DateTimeFormat(undefined, { month: "short" }).format(datetime.value).toUpperCase());
const day = computed(() => Intl.DateTimeFormat(undefined, { day: "numeric" }).format(datetime.value));

// extract location
const location = computed(() => {
  if (!props.event.venue) {
    return null;
  }

  const { street_address, postal_code, city, country } = props.event.venue;
  let location = "";

  // add location parts
  if (street_address) {
    location += `${street_address}, `;
  }

  if (postal_code) {
    location += `${postal_code} `;
  }

  if (city) {
    location += `${city}, `;
  }

  if (country) {
    location += `${country}`;
  }

  // strip outer spaces and commas
  location = location.trim().replace(/^,+|,+$/, "");

  return location;
});

// generate google search url for the location
const locationLink = computed(() => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.value)}`);

// extract offer (ticket link, etc.)
// const offer = computed(() => props.event.offers?.length
//   ? { text: props.event.offers[0].type, link: props.event.offers[0].url }
//   : { text: "Info", link: props.event.url });
</script>

<template>
  <div class="flex items-stretch justify-center gap-4">
    <div class="flex w-16 flex-none flex-col items-center justify-center">
      <div class="font-title text-xl">
        {{ month }}
      </div>
      <div class="font-title text-4xl opacity-muted">
        {{ day }}
      </div>
    </div>

    <div class="flex w-96 min-w-0 shrink flex-col items-stretch justify-start gap-1">
      <h3>
        <a
          class="link-plain truncate link-hover"
          :href="event.url"
          target="_blank"
          rel="noopener noreferrer"
        >{{ event.title ?? event.venue.location }}</a>
      </h3>
      <p class="truncate opacity-muted">
        <a
          class="link-plain link-hover"
          :href="locationLink"
          target="_blank"
          rel="noopener noreferrer"
        >{{ location }}</a>
      </p>
    </div>
  </div>
</template>
