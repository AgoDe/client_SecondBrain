import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from "./App.vue";
import router from "./router";
import i18n from './i18n'
import globalComponents from "./global-components";
import utils from "./utils";
import "./assets/css/app.css";

import axios from "axios";
//axios.defaults.baseURL = "http://localhost:5001/api";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");

window.axios = axios;
window.router = router;
const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
})
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
            .use(i18n)
            .use(router)
            .use(pinia);

globalComponents(app);
utils(app);

app.mount("#app");
