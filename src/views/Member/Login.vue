<template>
  <div class="login">
    <el-dialog :close-on-click-modal="false" title="忘記帳號" :visible.sync="showForgetAcc">
      <el-form ref="forgetForm" label-width="90px">
        <p>
          請輸入您的身分證字號和電子郵件地址。經確認後，
          您將收到通過E-mail給您的帳號名稱。
        </p>
        <el-form-item label="身分證字號">
          <el-input v-model="forgetAcc.uid"></el-input>
        </el-form-item>
        <el-form-item label="電子郵件">
          <el-input v-model="forgetAcc.mail"></el-input>
        </el-form-item>
        <div class="buttonList">
          <el-button type="primary" @click="PostForgetAccount">確定</el-button>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog :close-on-click-modal="false" title="忘記密碼" :visible.sync="forget">
      <el-form ref="forgetForm" label-width="70px">
        <p>
          請輸入您的登入帳號和電子郵件地址。經確認後，
          您將收到通過E-mail給您修改密碼的相關連結。
        </p>
        <el-form-item label="會員帳號">
          <el-input v-model="forgetForm.acc"></el-input>
        </el-form-item>
        <el-form-item label="電子郵件">
          <el-input v-model="forgetForm.mail"></el-input>
        </el-form-item>
        <div class="buttonList">
          <el-button type="primary" @click="PutForgetOwd">確定</el-button>
        </div>
      </el-form>
    </el-dialog>

    <el-form ref="form" label-width="70px">
      <p class="red" style="text-align: center">
        在校教職員生登入帳號、密碼同校務資訊系統。
      </p>
      <el-form-item label="帳號">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密碼">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="驗證碼">
        <div style="display: flex">
          <el-input v-model="auth" @keyup.enter.native="login"></el-input>
          <div @click="makeRealAuth()">
            <Identify :identifyCode="realAuth"></Identify>
            <div class="red">驗證碼四碼皆為數字</div>
          </div>
        </div>
      </el-form-item>
      <!--<el-form-item label="是本校生">
        <el-switch v-model="form.hasMember" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>-->

      <div class="buttonList">
        <el-button type="primary" @click="login">登入</el-button>
      </div>
      <div class="buttonList">
        <el-button @click="$router.push('SignUp')">
          <p class="m-0">註冊會員</p>
          <p class="m-0 red">（校外人士）</p>
        </el-button>
        <el-button @click="showForgetAcc = !showForgetAcc">
          <p class="m-0">忘記帳號</p>
          <p class="m-0 red">（校外人士）</p>
        </el-button>
        <el-button @click="forget = !forget">
          <p class="m-0">忘記密碼</p>
          <p class="m-0 red">（校外人士）</p>
        </el-button>
        <el-button @click="hrefUrl">在校教職員生忘記密碼</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Identify from "@/components/Identify";
export default {
  data() {
    return {
      form: {
        account: "",
        password: "",
        hasMember: true,
      },
      auth: "",
      realAuth: "",
      forget: false,
      showForgetAcc: false,
      forgetForm: {
        acc: "",
        mail: "",
      },
      forgetAcc: {
        uid: "",
        mail: "",
      },
    };
  },
  components: { Identify },
  created() {
    const vm = this;
    vm.makeRealAuth();
    location.wenzao_CToken = "";
    vm.$store.dispatch("memberData", "");

    let account = vm.$route?.query?.account;
    let password = vm.$route?.query?.password;
    if (password && account) {
      console.log("fast login");
      vm.form.account = account;
      vm.form.password = password;
      vm.login();
    }
  },
  methods: {
    async login() {
      if (this.auth != this.realAuth && !this.$route?.query?.account) {
        alert("驗證碼錯誤");
        return 0;
      }
      this.$store.dispatch("loading", true);
      let data = await this.$api
        .GetClientToken(this.form)
        .then((res) => res.data)
        .catch(() => {
          return { success: false, message: "帳號或密碼錯誤!" };
        });
      if (data.success) {
        localStorage.wenzao_CToken = data.token;
        let obj = {
          token: localStorage.wenzao_CToken,
          hasMember: this.form.hasMember,
        };
        this.$store.dispatch(
          "memberData",
          await this.$api
            .GetClientInfoByToken(obj)
            .then((res) => res.data.response)
        );
        this.$store.dispatch(
          "memberData",
          await this.$api
            .GetByAccount({ account: this.$store.state.memberData.UserAccount })
            .then((res) => res.data.response)
        );
        if (this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect).then(() => {
            location.reload();
          });
        } else {
          this.$router.push({ name: "index" }).then(() => {
            location.reload();
          });
        }
      } else {
        alert(data.message);
      }
      this.$store.dispatch("loading", false);
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    makeRealAuth() {
      this.realAuth = "";
      for (let i = 0; i < 4; i++) {
        this.realAuth += this.randomNum(0, 9);
      }
    },
    async PostForgetAccount() {
      if (!this.forgetAcc.uid || !this.forgetAcc.mail) {
        alert("資訊不得為空");
        return 0;
      }
      this.$store.dispatch("loading", true);
      let flag = await this.$api
        .PostForgetAccount(this.forgetAcc)
        .then((res) => res.data);
      alert(flag.msg);
      if (flag.success) {
        this.$router.push({ name: "login" });
      }
      this.$store.dispatch("loading", false);
    },
    async PutForgetOwd() {
      this.$store.dispatch("loading", true);
      let flag = await this.$api
        .PutForgetOwd(this.forgetForm)
        .then((res) => res.data);
      alert(flag.msg);
      if (flag.success) {
        this.$router.push({ name: "login" });
      }
      this.$store.dispatch("loading", false);
    },
    hrefUrl() {
      location.href =
        "https://web2.wzu.edu.tw/nsis/wenzao_47/index.php?c=k001&act=add_online";
    },
  },
};
</script>