---
title: Goatless
---

<script setup>
import { onMounted } from "vue";
import { useBackdropStore } from "@/store/backdrop";

const backdropStore = useBackdropStore();

onMounted(() => {
  backdropStore.setMedia("/videos/heroBackdrop.mp4");
});
</script>

![Photo of Goatless' lead singer Good Trip and bassist Lukas](/images/hero.jpg)

<UiVSpace />

Founded in 2020 and having played on various stages across Berlin, Goatless made
their international debut in 2022. Their style has evolved to span a variety of
genres, fusing rock and pop with hip-hop elements. With catchy medleys,
originals, and creative covers, Goatless captivates the spirit of artists such
as Daft Punk, Gorillaz and Red Hot Chili Peppers.

<UiVSpace />

<UiButton to="/contact">Book us now</UiButton>

<UiVSpace />

... or come to [one of our next gigs](/shows) to experience the G.O.A.T. in
Goatless.

<UiVSpace />

TODO: More images
