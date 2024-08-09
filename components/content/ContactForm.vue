<script setup>
import Button from "@/components/content/Button.vue";
</script>

<template>
  <form>
    <div className="mb-4">
      <label className="block mb-1" for="name">Name</label>
      <input className="appearance-none w-full py-2 px-3 leading-tight focus:outline-none bg-background-shade text-foreground" type="text" name="name" required autoFocus>
    </div>
    <div className="mb-4">
      <label className="block mb-1" for="email">Email</label>
      <input className="appearance-none w-full py-2 px-3 leading-tight focus:outline-none bg-background-shade text-foreground" type="email" name="email" required>
    </div>
    <div className="mb-4">
      <label className="block mb-1" for="message">You Message</label>
      <textarea className="appearance-none w-full py-2 px-3 leading-tight focus:outline-none bg-background-shade text-foreground" name="message" rows="10" required />
    </div>
    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
