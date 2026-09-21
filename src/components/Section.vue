<script setup>
import SectionHeading from "./SectionHeading.vue";

defineProps({
  title: { type: String, required: true },
  sectionId: { type: String, default: undefined },
  alignLeft: Boolean,
  alignRight: Boolean,
  fillScreen: Boolean,
});
</script>

<template>
  <section class="padded-container mb-24 space-y-4">
    <SectionHeading
      :section-id="sectionId"
      class="w-full"
      :class="{
        'md:w-1/2': alignLeft,
        'ml-auto md:w-1/2': alignRight,
      }"
    >
      {{ title }}
    </SectionHeading>

    <div
      class="w-full space-y-4"
      :class="{
        'md:w-1/2': alignLeft,
        'ml-auto md:w-1/2': alignRight,
      }"
    >
      <slot />

      <div
        v-if="fillScreen"
        class="h-[50vh] print:h-auto"
      />
    </div>
  </section>
</template>
