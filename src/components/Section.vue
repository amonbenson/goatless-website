<script setup>
defineProps({
  title: { type: String, required: true },
  alignLeft: Boolean,
  alignRight: Boolean,
  fillScreen: Boolean,
});
</script>

<template>
  <section
    class="padded-container space-y-8"
    :class="{
      'min-h-[min(75vh,48rem)]': fillScreen,
    }"
  >
    <h2
      class="w-full"
      :class="{
        'md:w-1/2': alignLeft,
        'md:w-1/2 ml-auto': alignRight,
      }"
    >
      {{ title }}
    </h2>

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
</template>
