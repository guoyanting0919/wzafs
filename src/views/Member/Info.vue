<template>
  <div class="Info">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="您的姓名">
        <el-input v-model="form.UserName" class="elInputWidth"></el-input>
      </el-form-item>
      <el-form-item label="電子郵件">
        <el-input v-model="form.UserEmail" class="elInputWidth"></el-input>
      </el-form-item>
      <el-form-item label="學校名稱">
        <el-input v-model="form.UserSchool" class="elInputWidth"></el-input>
      </el-form-item>
      <el-form-item label="所屬單位">
        <el-input v-model="form.UnitName" class="elInputWidth"></el-input>
      </el-form-item>
      <el-form-item label="性別">
        <el-radio-group v-model="form.Sex">
          <el-radio :label="'1'">男</el-radio>
          <el-radio :label="'2'">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--<el-form-item label="訂閱電子報">
        <el-radio-group v-model="form.sub">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>-->
      <el-form-item label="驗證碼" prop="captcha">
        <div style="display:flex;">
          <el-input v-model="auth" class="elInputWidth"></el-input>
          <div @click="makeRealAuth()"><Identify :identifyCode="realAuth"></Identify></div>
        </div>
      </el-form-item>
      <div class="buttonList">
        <el-button type="primary" @click="sub">確認</el-button>
        <el-button type="primary">重新輸入</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import Identify from "@/components/Identify"
export default {
  components:{Identify},
  data() {
    return {
      form:this.$store.state.memberData,
      auth:"",
      realAuth:""
    }
  },
  async created() {
    this.makeRealAuth()
    if(this.$store.state.memberData.Source=="School") {
      alert("本校生無法使用此功能")
      this.$router.go(-1)
    }
  },
  methods: {
    async sub() {
      if(this.auth!=this.realAuth) {
        alert("驗證碼錯誤")
        return 0
      }
      this.$store.dispatch("loading",true)
      alert(await this.$api.PutMember(this.form).then(res=>res.data.msg))
      this.$store.dispatch("loading",false)
    },
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    makeRealAuth() {
      this.realAuth=""
      for(let i=0;i<4;i++) {
        this.realAuth+=this.randomNum(0,9)
      }
    }
  }
}
</script>