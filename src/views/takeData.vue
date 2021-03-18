<template>
  <div>接收資料</div>
</template>

<script>
export default {
  data() {
    return {
      form:{}
    }
  },
  async created() {
    this.form=this.$router.currentRoute.query
    await this.login()
  },
  methods: {
       async login() {
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
        this.$router.push({ name: "index" }).then(() => {
          location.reload();
        });
      } else {
        alert(data.message);
      }
      this.$store.dispatch("loading", false);
    },
  }
}
</script>

<style>

</style>