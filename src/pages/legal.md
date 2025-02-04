---
title: Legal Notice
---

<script setup>
const address = import.meta.env.VITE_LEGAL_ADDRESS
const phone = import.meta.env.VITE_LEGAL_PHONE
const email = import.meta.env.VITE_LEGAL_EMAIL
</script>

## Band Name

Goatless

<UiVSpace />

## Website Owner / Responsible for Content

<p v-html="address" class="mb-4" />

Phone: <a :href="`tel:${phone.replaceAll(' ', '')}`">{{ phone }}</a><br>
Email: <a :href="`mailto:${email}`">{{ email }}</a>
