<script setup>
import { onMounted } from "vue";

const backdropMedia = useState("backdropMedia");

onMounted(async () => {
  backdropMedia.value = "/videos/heroBackdrop.mp4";
});
</script>

<template>
  <div>
    <ContentQuery v-slot="{ data }" :path="$route.path" find="one">
      <ProseH2 id="upcoming-shows">
        Upcoming Shows
      </ProseH2>
      <ShowCardList
        :shows="data.shows"
        filter="upcoming"
      >
        <template #empty>
          <p>
            No upcoming shows are scheduled. Follow us on <NuxtLink
              to="https://www.instagram.com/goatless_official"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </NuxtLink> for the latest updates.
          </p>
        </template>
      </ShowCardList>

      <Vspace />

      <ProseH2 id="past-shows">
        Past Shows
      </ProseH2>
      <ShowCardList
        :shows="data.shows"
        filter="past"
        weak
      />
    </ContentQuery>
  </div>
</template>
