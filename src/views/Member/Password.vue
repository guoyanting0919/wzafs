<template>
  <div class="Password">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="請輸入舊密碼" prop="oldPassword">
        <el-input v-model="form.oldPwd" class="elInputWidth" show-password></el-input>
      </el-form-item>
      <el-form-item label="請輸入新密碼" prop="newPassword">
        <el-input v-model="form.newPwd" class="elInputWidth" show-password></el-input>
      </el-form-item>
      <el-form-item label="請再輸入新密碼" prop="reNewPassword">
        <el-input v-model="reNewPwd" class="elInputWidth" show-password></el-input>
      </el-form-item>
      <div class="buttonList">
        <el-button type="primary" @click="sub">確認</el-button>
        <el-button type="primary">重新輸入</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        MemberId: this.$store.state.memberData.Id,
        oldPwd: '',
        newPwd: '',
      },
      reNewPwd:''
    }
  },
  created() {
    if(this.$store.state.memberData.Source=="School") {
      alert("本校生無法使用此功能")
      this.$router.go(-1)
    }
  },
  methods: {
    async sub() {
      if((!this.form.newPwd||!this.reNewPwd)||this.form.newPwd!=this.reNewPwd) {
        alert("新密碼輸入不一致!")
        return 0
      }
      this.$store.dispatch("loading",true)
      let flag=await this.$api.PutNewPassword(this.form).then(res=>res.data)
      if(flag.success) {
        alert(flag.msg)
        this.$router.push({name:"index"})
      }
      else {
         alert(flag.msg)
      }
      this.$store.dispatch("loading",false)
    }
  }
}
</script>