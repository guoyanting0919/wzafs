<template>
  <div id="app">
    <Loading v-if="$store.state.loading"></Loading>
    <LeftMenuMobile :name="'Member'" ref="LeftMenuMobile"></LeftMenuMobile>
    <Top @getMenuSet="$refs.LeftMenuMobile.OpenSwich()"></Top>
    <div class="content">
      <router-view v-if="ready" />
    </div>
    <Floor></Floor>
  </div>
</template>

<script>
import Top from "@/components/Top.vue";
import Floor from "@/components/Floor.vue";
import Loading from "@/components/Loading.vue";
import LeftMenuMobile from "@/components/LeftMenuMobile.vue";
export default {
  components: { Top, Floor, Loading, LeftMenuMobile },
  computed: {
    ready() {
      return (
        (localStorage.wenzao_CToken && this.$store.state.memberData) ||
        !localStorage.wenzao_CToken
      );
    },
  },
  async created() {
    console.log("a");
    if (localStorage.wenzao_CToken && !this.$store.state.memberData) {
      let obj = {
        token: localStorage.wenzao_CToken,
        hasMember: true,
      };
      let data;
      await this.$api.GetClientInfoByToken(obj).then((res) => {
        data = res.data.response;
        this.$store.dispatch("memberData", data);
        console.log("GetClientInfoByToken", data);
      });

      // await this.$api.GetActivity({ intPageSize: 20, page: 1 }).then((res3) => {
      //   console.log("======", res3.data.response, "======");
      // });

      // this.$store.dispatch(
      //   "memberData",
      //   await this.$api
      //     .GetClientInfoByToken(obj)
      //     .then((res) => res.data.response)
      // );
      // this.$store.dispatch(
      //   "memberData",
      //   await this.$api
      //     .GetByAccount({ account: this.$store.state.memberData.UserAccount })
      //     .then((res) => res.data.response)
      // );
      await this.$api
        .GetByAccount({ account: this.$store.state.memberData.UserAccount })
        .then((res2) => {
          console.log("------", res2, "------");
          this.$store.dispatch("memberData", res2.data.response);
        });
      console.log(this.$store.state.memberData);
    }
  },
};
</script>