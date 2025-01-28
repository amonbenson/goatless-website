<script setup>
defineProps({
  is: { type: String, default: "div" },
});
</script>

<template>
  <component
    :is="is"
    class="w-full max-h-screen overflow-y-scroll overflow-x-hidden"
  >
    <div class="w-screen h-full">
      <div class="h-full mx-auto px-4 md:px-8 container">
        <slot />
      </div>
    </div>
  </component>
</template>
