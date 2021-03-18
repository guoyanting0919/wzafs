import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("../views/index.vue"),
    meta: {
      title: "活動列表",
    },
  },
  {
    path: "/takeData",
    name: "takeData",
    component: () => import("../views/takeData.vue"),
    meta: {
      title: "接收資料",
    },
  },
  {
    path: "/Member",
    name: "Member",
    component: () => import("../views/Member/index.vue"),
    meta: {
      title: "會員中心",
    },
    redirect: "/Member/Participate",
    children: [
      {
        path: "login",
        name: "login",
        show: false,
        meta: {
          title: "會員登入",
        },
        component: () => import("../views/Member/Login.vue"),
      },
      {
        path: "SignUp",
        name: "SignUp",
        show: false,
        meta: {
          title: "會員註冊",
        },
        component: () => import("../views/Member/SignUp.vue"),
      },
      {
        path: "Info",
        name: "MemberInfo",
        show: true,
        meta: {
          title: "帳號資料",
          schoolNoShow: true,
        },
        component: () => import("../views/Member/Info.vue"),
      },
      {
        path: "Password",
        name: "MemberPassword",
        show: true,
        meta: {
          title: "修改密碼",
          schoolNoShow: true,
        },
        component: () => import("../views/Member/Password.vue"),
      },
      /*{
        path: 'Form',
        name: 'MemberForm',
        show:true,
        meta: {
          title: '已填表單'
        },
        component: () => import('../views/Member/Form.vue'),
      },*/
      /*{
        path: 'SignComp',
        name: 'MemberSignComp',
        show:true,
        meta: {
          title: '我報名的活動/會議'
        },
        component: () => import('../views/Member/SignComp.vue'),
      },*/
      {
        path: "Participate",
        name: "MemberParticipate",
        show: true,
        meta: {
          title: "我參與過的活動",
          schoolNoShow: false,
        },
        component: () => import("../views/Member/Participate.vue"),
      },
    ],
  },
  {
    path: "/Activity",
    name: "Activity",
    component: () => import("../views/Activity/index.vue"),
    meta: {
      title: "活動資訊",
    },
    redirect: "/",
    children: [
      {
        path: "Detail",
        name: "ActivityDetail",
        show: true,
        meta: {
          title: "活動詳情",
        },
        component: () => import("../views/Activity/Detail.vue"),
      },
      {
        path: "Join",
        name: "ActivityJoin",
        show: true,
        meta: {
          title: "線上報名",
        },
        component: () => import("../views/Activity/Join.vue"),
      },
      {
        path: "AttachmentFiles",
        name: "ActivityAttachmentFiles",
        show: true,
        meta: {
          title: "檔案下載",
        },
        component: () => import("../views/Activity/AttachmentFiles.vue"),
      },
      {
        path: "Traffic",
        name: "ActivityTraffic",
        show: true,
        meta: {
          title: "交通指引",
        },
        component: () => import("../views/Activity/Traffic.vue"),
      },
      {
        path: "Map",
        name: "ActivityMap",
        show: true,
        meta: {
          title: "校園地圖",
        },
        component: () => import("../views/Activity/Map.vue"),
      },
      {
        path: "FloorPlan",
        name: "ActivityFloorPlan",
        show: true,
        meta: {
          title: "本校平面圖",
        },
        component: () => import("../views/Activity/FloorPlan.vue"),
      },
      {
        path: "MemberList",
        name: "ActivityMemberList",
        show: true,
        meta: {
          title: "已報名名單",
        },
        component: () => import("../views/Activity/MemberList.vue"),
      },
      {
        path: "CheckIn",
        name: "ActivityCheckIn",
        show: false,
        meta: {
          title: "報到",
        },
        component: () => import("../views/Activity/CheckIn.vue"),
      },
      {
        path: "QRCodeJoin",
        name: "ActivityQRCodeJoin",
        show: false,
        meta: {
          title: "QRCode報到",
        },
        component: () => import("../views/Activity/QRCodeJoin.vue"),
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    show: true,
    meta: {
      title: "404 - 查無此頁",
    },
    component: () => import("../views/Err404.vue"),
  },
  { path: "*", redirect: "/404" },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
