<script setup>
import { onMounted, ref } from "vue";
import Button from "@/components/content/Button.vue";

// automatically focus the first input
const name = ref(null);

onMounted(() => {
  name.value.focus();
});
</script>

<template>
  <form>
    <div className="mb-4">
      <label className="block mb-1" for="name">Name</label>
      <input id="name" ref="name" className="form-input w-full py-2 px-3 leading-tight focus:outline-none bg-background-shade text-foreground" type="text" name="name" required autofocus autocomplete="name">
    </div>
    <div className="mb-4">
      <label className="block mb-1" for="email">Email</label>
      <input id="email" className="form-input w-full py-2 px-3 leading-tight focus:outline-none bg-background-shade text-foreground" type="email" name="email" required autocomplete="email">
    </div>
    <div className="mb-4">
      <label className="block mb-1" for="message">You Message</label>
      <textarea id="message" className="form-textarea w-full py-2 px-3 leading-tight focus:outline-none bg-background-shade text-foreground" name="message" rows="10" required />
    </div>
    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
