import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@unhead/vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/index.css";

const head = createHead();
const pinia = createPinia();
const app = createApp(App);

app.use(head);
app.use(pinia);
app.use(router);
app.mount("#app");
