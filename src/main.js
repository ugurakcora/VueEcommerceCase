import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Vue Router'ı içe aktarın
import store from "./store"; // Vuex Store'u içe aktarın
import "./style/Base.css";

const app = createApp(App);
app.use(router); // Vue Router'ı kullanılabilir hale getirin
app.use(store); // Vuex Store'u kullanılabilir hale getirin
app.config.globalProperties.$formatPrice = function (price) {
  const priceString = price.toFixed(2); // Ondalık kısmı iki basamak olarak sabitleyin
  return priceString.replace(".", ",") + " ₺";
};
app.mount("#app");
