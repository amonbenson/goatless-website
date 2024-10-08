<script setup>
import { computed } from "vue";
import ButtonLink from "./ButtonLink.vue";

const props = defineProps({
  date: { type: String, required: true },
  venue: { type: String, required: true },
  venueLocation: String,
  venueUrl: String,
  button: String,
  buttonUrl: String,
  image: String,
  weak: Boolean
});

const buttonEnabled = computed(() => !props.weak && props.button && props.buttonUrl);

const backgroundImage = computed(() => {
  if (props.image && !props.weak) {
    return [
      "linear-gradient(135deg, rgb(var(--background-rgb) / 0.9), rgb(var(--background-rgb) / 0.5))",
      `url('${props.image}')`
    ].join(", ");
  }
  else {
    return "none";
  }
});

// const backdropMedia = useState("backdropMedia");
// const backdropOpacity = useState("backdropOpacity");

function enableBackdrop() {
  // if (props.image && !props.weak) {
  //   backdropMedia.value = props.image;
  //   backdropOpacity.value = 0.5;
  // }
}

function disableBackdrop() {
  // if (backdropMedia.value) {
  //   backdropMedia.value = null;
  // }
}

const formattedDate = computed(() => {
  const date = new Date(props.date);

  // include year only if it's not the current year
  const currentYear = new Date().getFullYear();

  const format = {
    day: "2-digit",
    month: "long",
    year: date.getFullYear() === currentYear ? undefined : "numeric"
  };

  return date.toLocaleDateString("en-EN", format);
});

const venueText = computed(() => {
  if (props.venueLocation) {
    return `${props.venue} \u00B7 ${props.venueLocation}`;
  }
  else {
    return props.venue;
  }
});
</script>

<template>
  <div
    class="relative flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-4 py-8 min-h-28 overflow-hidden bg-center bg-cover backdrop-blur-xl"
    :class="weak ? 'border-foreground/20 border-2' : 'bg-foreground/10'"
    :style="reactive({ backgroundImage })"
    @mouseenter.prevent="enableBackdrop()"
    @mouseleave.prevent="disableBackdrop()"
  >
    <!-- Date -->
    <div class="flex justify-center items-center w-48">
      <p class="text-lg">
        {{ formattedDate }}
      </p>
    </div>

    <!-- Venue -->
    <div class="mx-2 text-lg font-bold text-center">
      <a
        v-if="props.venueUrl"
        class="text-inherit"
        :href="props.venueUrl"
        target="_blank"
        rel="noopener"
      >
        {{ venueText }}
      </a>
      <span v-else>
        {{ venueText }}
      </span>
    </div>

    <!-- Info / Ticket Button -->
    <div
      :class="buttonEnabled ? 'flex' : 'hidden'"
      class="md:flex justify-center items-center w-48"
    >
      <ButtonLink
        v-if="buttonEnabled"
        class="w-32"
        :to="props.buttonUrl"
        new-tab
      >
        {{ props.button }}
      </ButtonLink>
    </div>
  </div>
</template>
