<script setup>
import { computed, toRefs, watch } from "vue";
import UiButton from "./UiButton.vue";
import ExternalLink from "./ExternalLink.vue";

const KNOWN_COUNTRIES = (import.meta.env["VITE_KNOWN_COUNTRIES"] ?? "").split(",").map(c => c.toLowerCase().trim());

const props = defineProps({
  event: { type: Object, required: true },
});
const { event } = toRefs(props);

// extract datetime
const datetime = computed((() => new Date(event.value.datetime)));

const month = computed(() => datetime.value.toLocaleDateString([], { month: "short" }).toUpperCase());
const day = computed(() => datetime.value.toLocaleDateString([], { day: "2-digit" }));
const time = computed(() => datetime.value.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
}));

// extract location
const location = computed(() => {
  if (!event.value.venue) {
    return null;
  }

  const { street_address, postal_code, city, country } = event.value.venue;
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
  if (country && !KNOWN_COUNTRIES.includes(country.toLowerCase().trim())) {
    location += `${country}`;
  }

  // strip outer spaces and commas
  location = location.trim().replace(/^,+|,+$/, "");

  return location;
});

const locationUrl = computed(() => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.value)}`);

// extract offers
const offer = computed(() => event.value.offers?.length
  ? { text: event.value.offers[0].type, url: event.value.offers[0].url }
  : { text: "Infos", url: event.value.url });
</script>

<template>
  <div class="flex gap-4 h-24 justify-stretch items-stretch">
    <div class="flex-none w-24 p-4 flex flex-col justify-center items-center bg-dark cursor-pointer">
      <div class="text-lg text-accent">
        {{ month }}
      </div>
      <div class="text-4xl">
        {{ day }}
      </div>
    </div>

    <div class="flex-1 p-6 flex justify-stretch items-stretch gap-4 bg-dark">
      <div class="flex-1 flex flex-col justify-center items-start gap-1">
        <h3>
          <ExternalLink
            class="plain-link"
            :to="event.url"
          >
            {{ event.title }}
          </ExternalLink>
        </h3>
        <ExternalLink
          v-if="event.venue"
          class="text-muted"
          :to="locationUrl"
        >
          {{ location }}
        </ExternalLink>
      </div>

      <UiButton
        class="flex-none w-24"
        :to="offer.url"
        external
      >
        <span class="text-xl">{{ offer.text }}</span>
      </UiButton>
    </div>

    <!-- <UiButton class="flex-none w-24 h-24">
      <span class="text-xl">Tickets</span>
    </UiButton> -->
  </div>
</template>
