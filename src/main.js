import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import { useAuthStore } from "./stores/auth";
import './assets/main.css'
import 'vue3-toastify/dist/index.css'; // import style toastify


const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

const auth = useAuthStore(pinia);
auth.loadFromStorage(); // load token sebelum routing

app.use(router);
app.mount("#app");
