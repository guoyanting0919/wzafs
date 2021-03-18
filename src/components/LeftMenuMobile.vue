<template>
  <div class="LeftMenuMobile" @click="OpenSwich" v-if="isOpen">
    <div class="LeftMenuMobileBox">
      <template>
        <div class="LeftMenuTitle">{{nowList.meta.title}}</div>
        <router-link :to="{name:'login'}">
          <div class="LeftMenuItem" v-if="!hasToken">
            <div>會員登入</div>
          </div>
        </router-link>
        <router-link :to="{name:'SignUp'}">
          <div class="LeftMenuItem" v-if="!hasToken">
            <div>會員註冊</div>
          </div>
        </router-link>
        <template v-for="(item,index) in nowList.children">
          <router-link :to="{name:item.name,query:$route.query}" :key="index" v-if="item.show&&hasToken">
            <div class="LeftMenuItem">
              <div>{{item.meta.title}}</div>
            </div>
          </router-link>
        </template>
        <div class="LeftMenuItem" @click="logout" v-if="hasToken">
          <div>登出</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "menu"],
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    nowList() {
      return this.$router.options.routes.filter((x) => x.name == this.name)[0];
    },
    hasToken() {
      return localStorage.wenzao_CToken;
    },
    getMenu() {
      if (this.menu && JSON.parse(this.menu)) {
        let data = JSON.parse(this.menu).filter((res) => res.Enable);
        for (let i in data) {
          if (data[i].Id == 1) data[i].name = "ActivityJoin";
          if (data[i].Id == 2) data[i].name = "ActivityAttachmentFiles";
          if (data[i].Id == 3) data[i].name = "ActivityDetail";
          if (data[i].Id == 4) data[i].name = "ActivityMemberList";
          if (data[i].Id == 5) data[i].name = "ActivityTraffic";
          if (data[i].Id == 6) data[i].name = "ActivityFloorPlan";
        }
        return data;
      } else {
        return false;
      }
    },
  },
  created() {
    // console.log(this.$router.currentRoute)
  },
  methods: {
    logout() {
      let flag = confirm("確認登出?");
      if (!flag) return 0;
      this.$store.dispatch("loading", true);
      localStorage.wenzao_CToken = "";
      this.$router.push({ name: "login" }).then(() => {
        location.reload();
      });
    },
    OpenSwich() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
