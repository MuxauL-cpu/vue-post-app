import Vue from "vue";
import Router from "vue-router";
import one from "../components/One.vue";
import two from "../components/Two.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/one",
      name: "one",
      component: one,
    },
    {
      path: "/two",
      name: "two",
      component: two,
    },
    {
      path: "*",
      redirect: "/one",
    },
  ],
});
