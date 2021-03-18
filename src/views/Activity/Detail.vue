<template>
  <div class="Detail">
    <div class="actSummary" style="display: flex; word-break: break-all" v-if="data.WebMode == 1 && img">
      <img class="ActImg" style="width: 39%; height: 200px; margin: 0 1% 0 0" :src="img" v-if="img" />
      <div style="width: 60%" v-html="data.ActSummary"></div>
    </div>
    <div class="actSummary" style="display: flex; word-break: break-all" v-if="data.WebMode == 2 && img">
      <div style="width: 60%" v-html="data.ActSummary"></div>
      <img class="ActImg" style="width: 39%; height: 200px; margin: 0 0 0 1%" :src="img" v-if="img" />
    </div>
    <div class="actSummary" style="word-break: break-all" v-if="data.WebMode == 3 || !img">
      <img class="ActImg" :src="img" v-if="img" />
      <div v-html="data.ActSummary"></div>
    </div>
    <div class="info">
      <el-button type="success" @click="$router.push({ name:'ActivityJoin', query: $route.query })">我要報名</el-button>
      <div class="infoItem">
        <div class="infoItemTitle">活動時間:</div>
        {{
          $Function.YYYYMMDDHHmm(data.ActStartDate) +
          " ~ " +
          $Function.YYYYMMDDHHmm(data.ActEndDate)
        }}
        <el-button @click="addToGoogleCalendar" type="primary" size='mini' style="margin-left:1rem">新增至Google行事曆</el-button>
      </div>
      <div class="infoItem">
        <div class="infoItemTitle">公告單位:</div>
        {{ data.ShowUnit }}
      </div>
      <!-- <div v-if="data.ShowActContents != ' '" class="infoItem">
        <div class="infoItemTitle">活動內容:</div>
        <div v-html="data.ShowActContents"></div>
      </div> -->
      <div class="infoItem">
        <div class="infoItemTitle">活動地點:</div>
        {{ data.ShowActAddr }}
      </div>
      <div class="infoItem">
        <div class="infoItemTitle">聯絡人:</div>
        {{ data.ShowContactName }}
      </div>
      <div class="infoItem">
        <div class="infoItemTitle">活動使用語言:</div>
        {{ data.ShowUseLanguage }}
      </div>
      <div class="infoItem">
        <div class="infoItemTitle">活動時數:</div>
        {{ data.ShowActTime }}
      </div>
      <div class="infoItem">
        <div class="infoItemTitle">報名起迄:</div>
        {{ data.SignupStartDate | dateTimeFilter }} ~
        {{ data.SignupEndDate | dateTimeFilter }}
        <!-- {{$Function.YYYYMMDD(data.SignupStartDate)+" ~ "+$Function.YYYYMMDD(data.SignupEndDate)}} -->
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["data"],
  data() {
    return {
      isLogInG: false,
      startG: "",
      endG: "",
      titleG: "",
    };
  },
  filters: {
    dateTimeFilter(date) {
      return `${moment(date).format("yyyy-MM-DD")} ${moment(date).format(
        "HH:mm"
      )}`;
    },
  },
  computed: {
    img() {
      console.log();
      return this.data && JSON.parse(this.data.ActImg)[0]
        ? this.$store.state.fileBase +
            "Files/" +
            JSON.parse(this.data.ActImg)[0].response
        : "";
    },
  },
  created() {
    this.$store.dispatch("loading", false);
    gapi.load("client:auth2", function () {
      gapi.auth2.init({
        client_id: process.env.VUE_APP_CLIENT_ID,
      });
      // console.log(gapi.client.hasOwnProperty("calendar"));
    });
    console.log(gapi);
  },
  methods: {
    addToGoogleCalendar() {
      const vm = this;
      if (vm.isLogInG) {
        //已登入則設定參數並執行 post()

        vm.startG = moment(this.data.ActStartDate).format();
        vm.endG = moment(this.data.ActEndDate).format();
        vm.titleG = this.data.ActName;
        vm.postGoogleCalendar();
      } else {
        //尚未登入執行authenticate
        alert("請先登入google帳號");
        vm.authenticate();
      }
    },
    authenticate() {
      //若尚未登入則跳出登入視窗
      const vm = this;
      return gapi.auth2
        .getAuthInstance()
        .signIn({
          scope:
            "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
        })
        .then(
          function () {
            vm.loadClient();
          },
          function (err) {
            console.error("Error signing in", err);
          }
        );
    },
    postGoogleCalendar() {
      const vm = this;
      return gapi.client.calendar.events
        .insert({
          calendarId: "primary",
          resource: {
            end: { dateTime: vm.endG },
            start: { dateTime: vm.startG },
            summary: vm.titleG,
          },
        })
        .then(
          function (response) {
            alert("新增成功");
          },
          function (err) {
            alert("新增失敗");
          }
        );
    },
    loadClient() {
      // 設定api key 並登入
      const vm = this;
      gapi.client.setApiKey(process.env.VUE_APP_API_KEY);
      return gapi.client
        .load(
          "https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest"
        )
        .then(
          function () {
            alert("成功登入，請再次點擊 '新增至Google行事曆' ");
            // console.log("GAPI client loaded for API");
            // console.log(gapi.client.hasOwnProperty("calendar"));
            vm.logInCheck();
          },
          function (err) {
            console.error("Error loading GAPI client for API", err);
          }
        );
    },
    logInCheck() {
      //檢查是否為登入狀態
      let check = gapi.hasOwnProperty("client");
      let check2 = gapi.client.hasOwnProperty("calendar");
      // console.log(check2);
      check2 ? (this.isLogInG = true) : (this.isLogInG = false);
    },
  },
};
</script>