<template>
  <button
    class="button"
  >
    <ContentSlot :use="$slots.default" unpack="p" />
  </button>
</template>
