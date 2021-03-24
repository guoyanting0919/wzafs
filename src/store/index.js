import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    // fileBase: "https://enroll.wzu.edu.tw/Files/",
    fileBase: process.env.VUE_APP_FILESURL,
    apiBase: "https://enroll.wzu.edu.tw/api/",
    memberData: "",
    actCategory: [
      { Id: 1, title: "無" },
      { Id: 2, title: "公開徵稿" },
      { Id: 3, title: "其他型式" },
    ],
    actType: [
      { Id: 1, title: "學術研討會" },
      { Id: 2, title: "作品發表會" },
      { Id: 3, title: "研習" },
      { Id: 5, title: "其他" },
    ],
    JoinType: ["主持人", "主講人", "參與人員", "講師"],
    // EventStatus: ["確認參加", "參與", "主辦", "缺席", "取消", "候補"],
    EventStatus: ["已報名", "參加", "主辦", "取消"],
  },
  mutations: {
    memberData(state, data) {
      state.memberData = data;
    },
    loading(state, data) {
      state.loading = data;
    },
  },
  actions: {
    memberData(context, payload) {
      context.commit("memberData", payload);
    },
    loading(context, payload) {
      context.commit("loading", payload);
    },
  },
  modules: {},
});
