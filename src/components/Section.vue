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
  <section
    class="padded-container space-y-8 mb-24"
  >
    <SectionHeading
      :section-id="sectionId"
      class="w-full"
      :class="{
        'md:w-1/2': alignLeft,
        'md:w-1/2 ml-auto': alignRight,
      }"
    >
      {{ title }}
    </SectionHeading>

    <div
      class="w-full space-y-8"
      :class="{
        'md:w-1/2': alignLeft,
        'md:w-1/2 ml-auto': alignRight,
      }"
    >
      <slot />
    </div>
  </section>

  <div
    v-if="fillScreen"
    class="h-[50vh]"
  />
</template>
