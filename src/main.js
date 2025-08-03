import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@unhead/vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import App from "./App.vue";
import "./assets/css/index.css";

gsap.registerPlugin(ScrollTrigger);

const head = createHead();
const pinia = createPinia();
const app = createApp(App);

app.use(head);
app.use(pinia);
app.mount("#app");
