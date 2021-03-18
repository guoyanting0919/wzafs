<template>
  <div class="CheckIn">
    <div class="CheckInBox">
      <div class="CheckInBoxItem">
        <span class="CheckInBoxItemLabel">活動名稱</span>
        <span class="CheckInBoxItemContent">{{ data.ActName }}</span>
      </div>
      <div class="CheckInBoxItem">
        <span class="CheckInBoxItemLabel">單位</span>
        <span class="CheckInBoxItemContent">{{ data.ActOrganizer }}</span>
      </div>
      <div class="CheckInBoxItem">
        <span class="CheckInBoxItemLabel">活動開始時間</span>
        <span class="CheckInBoxItemContent">{{ data.ActStartDate }}</span>
      </div>
      <div class="CheckInBoxForm" style="padding-top: 20px">
        <el-form label-width="50px">
          <el-form-item label="帳號">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item label="密碼">
            <el-input v-model="form.password" show-password></el-input>
          </el-form-item>
        </el-form>
        <div class="CheckInBoxFormButtonList">
          <el-button type="primary" @click="sub(1)" :disabled="startNotYet"
            >報到</el-button
          >
          <el-button type="danger" @click="sub(2)" :disabled="startNotYet"
            >簽退</el-button
          >
        </div>
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
      userData: "",
      form: {
        ActivityId: "",
        account: "",
        password: "",
        type: 1,
      },
      startNotYet: true,
    };
  },
  async created() {
    console.log(this.data.QRCodePwd);
    this.form.ActivityId = this.data.Id;
    this.$store.dispatch("loading", false);
  },
  mounted() {
    const datetime = new Date();
    const dayDistance = moment(this.data.ActStartDate).diff(moment(datetime));
    if (dayDistance > 0) {
      this.startNotYet = true;
    } else {
      this.startNotYet = false;
    }
  },
  methods: {
    async sub(x) {
      if (!this.form.account || !this.form.password) {
        alert("請輸入帳號密碼");
        // return 0;
      } else {
        this.$store.dispatch("loading", true);
        this.form.type = x;
        let flag = await this.$api
          .OtherCheckInClient(this.form)
          .then((res) => res.data);
        if (flag.success) {
          alert(flag.msg);
          window.close();
        } else {
          alert("帳號或密碼錯誤");
        }
        this.$store.dispatch("loading", false);
      }
    },
  },
};
</script>

<style>
</style>