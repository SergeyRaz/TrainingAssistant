import Vue from "vue";
import App from "./App.vue";
require("babel-core/register");
require("babel-polyfill");

import { store } from "./store/store.js";

new Vue({
  el: "#app",
  store,
  render: h => h(App)
});
