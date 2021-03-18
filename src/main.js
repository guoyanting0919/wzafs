import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./api/apis";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/zh-TW";
import "element-ui/lib/theme-chalk/index.css";
import "./css/index.scss";
import global from "./global.js";
import $Function from "./globalFunction.js";

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });
Vue.prototype.$global = Vue.observable(global);
Vue.prototype.$api = api;
Vue.prototype.$Function = $Function;

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    const t = to.meta.title == "活動列表" ? "" : `-${to.meta.title}`;
    document.title = `文藻活動報名系統${t}`;
  }
  if (localStorage.wenzao_CToken && to.name == "login") {
    next({ name: "index" });
    return 0;
  }
  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
