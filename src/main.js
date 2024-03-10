import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import globalComponents from "./global-components";
import utils from "./utils";
import "./assets/css/app.css";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:5001/api";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers["Content-Type"] = "application/json";

window.axios = axios;
window.router = router;

const app = createApp(App)
            .use(router)
            .use(createPinia());

globalComponents(app);
utils(app);

app.mount("#app");
