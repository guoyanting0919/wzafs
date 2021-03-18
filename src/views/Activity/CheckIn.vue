<template>
  <div class="CheckIn">
    <div class="CheckInBox">
      <div class="CheckInBoxItem">
        <span class="CheckInBoxItemLabel">活動名稱</span>
        <span class="CheckInBoxItemContent">{{ data.ActName }}</span>
      </div>
      <div class="CheckInBoxItem">
        <span class="CheckInBoxItemLabel">參與人員姓名</span>
        <span class="CheckInBoxItemContent">{{ userData }}</span>
      </div>
      <div class="CheckInBoxItem">
        <span class="CheckInBoxItemLabel">單位</span>
        <span class="CheckInBoxItemContent">{{ data.ActOrganizer }}</span>
      </div>
      <div class="CheckInBoxItem">
        <span class="CheckInBoxItemLabel">活動開始時間</span>
        <span class="CheckInBoxItemContent">{{ data.ActStartDate }}</span>
      </div>
      <div class="CheckInBoxForm">
        <h2>文藻外語大學</h2>
        <div class="CheckInBoxItem">
          <span class="CheckInBoxItemLabel">密碼輸入</span>
          <el-input v-model="form.codepass"></el-input>
        </div>
        <div class="CheckInBoxFormButtonList">
          <el-button type="primary" @click="QRCodeCheckIn">確認</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import moment from 'moment'
export default {
  props: ["data"],
  data() {
    return {
      userData: "",
      form: {
        codepass: "",
        hashcode: this.$router.currentRoute.query.hashcode,
      },
    };
  },
  async created() {
    this.userData = await this.$api
      .GetCheckData({ hashcode: this.$router.currentRoute.query.hashcode })
      .then((res) => res.data.response);
    this.form.ActivityId = this.data.Id;
    this.form.account = this.userData.UserAccount;
    this.$store.dispatch("loading", false);
  },
  methods: {
    isTime() {},
    async QRCodeCheckIn() {
      let flag = await this.$api
        .QRCodeCheckIn(this.form)
        .then((res) => res.data);
      alert(flag.msg);
    },
  },
};
</script>

<style>
</style>