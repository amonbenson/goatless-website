<script setup>
import { ref, nextTick } from "vue";
import setlistTemplateContents from "@/assets/tex/setlistTemplate.tex?raw";
import logoUrl from "/images/setlist_logo.png?url";
import JSZip from "jszip";

const today = new Date();
const todayStr = `${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth() + 1).padStart(2, "0")}.${today.getFullYear()}`;

const date = ref(todayStr);
const location = ref("Aufführungsort");
const songlist = ref("First Song\nSecond Song\n-\nThird Song");

const snipUri = ref();

async function generateSetlist() {
  const songlistStr = songlist.value
    .split("\n")
    .map(x => x.trim())
    .filter(x => !!x)
    .map(x => x.startsWith("-") ? "\\songsep" : `\\songtitle{${x}}`)
    .join("\\\\\n")
    .replace("\\songsep\\\\", "\\songsep");
  const mainTex = setlistTemplateContents
    .replace("xxx_logo_xxx", "logo.png")
    .replace("xxx_title_xxx", `${date.value} -- ${location.value}`)
    .replace("xxx_songlist_xxx", songlistStr);

  const logoRes = await fetch(logoUrl);
  const logoBuffer = await logoRes.arrayBuffer();

  const zip = new JSZip();
  zip.file("main.tex", mainTex);
  zip.file("logo.png", logoBuffer);
  const zipContents = await zip.generateAsync({ type: "base64" });

  // set the uri and invoke the form
  snipUri.value = `data:application/x-tex;base64,${zipContents}`;
  nextTick(() => document.getElementById("setlist-generator-form").submit());
}
</script>

<template>
  <div class="m-8 flex flex-col items-center gap-4">
    <h1>Setlist Generator</h1>

    <form
      id="setlist-generator-form"
      class="flex flex-col w-full max-w-128 gap-4"
      action="https://www.overleaf.com/docs"
      method="post"
      target="_blank"
    >
      <input
        v-model="date"
        name="date"
        class="ui-input"
        placeholder="Datum"
      >

      <input
        v-model="location"
        name="location"
        class="ui-input"
        placeholder="Aufführungsort"
      >

      <textarea
        v-model="songlist"
        name="setlist"
        class="ui-input"
        rows="10"
        placeholder="Setlist"
      />

      <input
        class="hidden"
        name="snip_uri"
        :value="snipUri"
      >

      <button
        class="ui-button"
        @click.prevent="generateSetlist()"
      >
        Generate
      </button>
    </form>
  </div>
</template>
