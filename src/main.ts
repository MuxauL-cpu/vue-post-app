import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const vuetify = new Vuetify({});

new Vue({
  render: (h) => h(App),
  router,
  vuetify,
}).$mount("#app");
