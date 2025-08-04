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
  <div class="flex justify-center items-stretch gap-4">
    <div class="flex-none w-16 flex flex-col justify-center items-center">
      <div class="font-title text-xl">
        {{ month }}
      </div>
      <div class="font-title text-4xl opacity-muted">
        {{ day }}
      </div>
    </div>

    <div class="shrink w-96 min-w-0 flex flex-col justify-start items-stretch gap-1">
      <h3>
        <a
          class="plain-link truncate"
          :href="event.url"
          target="_blank"
          rel="noopener noreferrer"
        >{{ event.title ?? event.venue.location }}</a>
      </h3>
      <p class="ftext-xl opacity-muted truncate">
        <a
          class="plain-link"
          :href="locationLink"
          target="_blank"
          rel="noopener noreferrer"
        >{{ location }}</a>
      </p>
    </div>
  </div>
</template>
