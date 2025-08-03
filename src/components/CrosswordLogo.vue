<script setup>
const columns = [
  { letters: "    G    ", link: null },
  { letters: "  SHOWS  ", link: "/shows" },
  { letters: "    A    ", link: null },
  { letters: " CONTACT ", link: "/contact" },
  { letters: "    L    ", link: null },
  { letters: "MEMBERS  ", link: "/members" },
  { letters: "    S    ", link: null },
  { letters: "    S    ", link: null },
];
</script>

<template>
  <div class="group flex justify-stretch items-stretch">
    <div
      v-for="{ letters, link }, i in columns"
      :key="i"
      class="basis-1/8 flex-col justify-stretch items-stretch group-hover:opacity-50 transition-opacity"
      :class="{
        'hover:opacity-100 cursor-pointer': link
      }"
    >
      <div
        v-for="letter, j in letters"
        :key="j"
        class="flex justify-center items-center"
        :class="j === 4 ? 'basis-2/10' : 'basis-1/10'"
      >
        <div
          class="font-title leading-none"
          :class="j === 4 ? 'text-[19vmin] -mb-[35%]' : 'text-[6vmin]'"
        >
          {{ letter.replace(' ', '&nbsp;') }}
        </div>
      </div>
    </div>
  </div>
</template>
