import axios from "axios";
import router from "@/router/index";
import Vue from "vue";
//import { to404Page, tokenExpire } from "./utils";
import store from "@/store/index";

// 錯誤捕捉
/*const errorHandle = (status, msg, response) => {
  switch (status) {
    case 400:
      to404Page();
      break;

    case 401:
      console.log(response);
      tokenExpire(response);
      break;

    case 403:
      to404Page();
      break;

    case 404:
      to404Page();
      break;

    case 500:
      to404Page();
      break;

    default:
      to404Page();
      break;
  }
};*/

// 設定 baseURL
let instance = axios.create({
  // baseURL: "/api",
  baseURL: process.env.VUE_APP_OIDC_BASEURL,
});

// request 攔截
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.wenzao_CToken;
    token && (config.headers.Authorization = `Bearer ${token}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response 攔截
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    console.log(response);
    if (
      response.data.Status == 401 &&
      response.data.Value == "很抱歉，您無權訪問該接口，請確保已經登錄!"
    ) {
      localStorage.wenzao_CToken = "";
      console.log(router.app.$route.fullPath);
      let redirectPath = router?.app?.$route?.fullPath || "/";
      router.push({ name: "login", query: { redirect: redirectPath } });
      store.dispatch("loading", false);
      //location.reload()
    }
    if (response) {
      //errorHandle(response.status, response.data.error, response);
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default function(method, url, data = null) {
  method = method.toLowerCase();
  if (method == "post") {
    return instance.post(url, data);
  } else if (method == "get") {
    return instance.get(url, { params: data });
  } else if (method == "delete") {
    return instance.delete(url, { params: data });
  } else if (method == "put") {
    return instance.put(url, data);
  } else {
    console.log("未知的 method");
    return false;
  }
}
