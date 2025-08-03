<script setup>
const LOGO_ROW = 4;

const columns = [
  { letters: "    G    ", link: null },
  { letters: "  SHOWS  ", link: "#shows" },
  { letters: "    A    ", link: null },
  { letters: " CONTACT ", link: "#contact" },
  { letters: "    L    ", link: null },
  { letters: "MEMBERS  ", link: "#goody" },
  { letters: "    S    ", link: null },
  { letters: "    S    ", link: null },
];
</script>

<template>
  <div class="group flex justify-stretch items-stretch">
    <component
      :is="link ? 'a' : 'div'"
      v-for="{ letters, link }, x in columns"
      :key="x"
      :href="link"
      class="basis-1/8 flex-col justify-stretch items-stretch text-white transition-colors"
      :class="{
        'hover:text-red-lighter': link
      }"
    >
      <div
        v-for="letter, y in letters"
        :key="y"
        class="flex justify-center items-center"
        :class="y === LOGO_ROW ? 'basis-2/10' : 'basis-1/10'"
      >
        <div
          class="font-title leading-none"
          :class="y === LOGO_ROW ? 'text-[19vmin] -mb-[35%] logo-letter-crossword' : 'text-[6vmin]'"
        >
          {{ letter.replace(' ', '&nbsp;') }}
        </div>
      </div>
    </component>
  </div>
</template>
