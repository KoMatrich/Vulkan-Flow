import { createApp } from "vue";
import "@vue-flow/core/dist/style.css";
import "@vue-flow/core/dist/theme-default.css";
import "@vue-flow/controls/dist/style.css";
import "@vue-flow/minimap/dist/style.css";
// Remove the node-toolbar CSS import as it doesn't exist
import "./assets/index.css";
import App from "./App.vue";

createApp(App).mount("#app");
