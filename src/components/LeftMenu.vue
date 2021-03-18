<template>
  <div class="LeftMenu">
    <template v-if="name=='Member'">
      <div class="LeftMenuTitle">{{nowList.meta.title}}</div>
      <router-link :to="{name:'login'}" v-if="!hasToken">
        <div class="LeftMenuItem">會員登入</div>
      </router-link>
      <router-link :to="{name:'SignUp'}" v-if="!hasToken">
        <div class="LeftMenuItem">會員註冊</div>
      </router-link>
      <template v-for="(item,index) in nowList.children">
        <template v-if="memberData.Source=='School'&&!item.meta.schoolNoShow">
          <router-link :key="index" :to="{name:item.name,query:$route.query}" v-if="item.show&&hasToken">
            <div class="LeftMenuItem">{{item.meta.title}}</div>
          </router-link>
        </template>
        <template v-if="memberData.Source!='School'&&(item.meta.schoolNoShow||!item.meta.schoolNoShow)">
          <router-link :key="index" :to="{name:item.name,query:$route.query}" v-if="item.show&&hasToken">
            <div class="LeftMenuItem">{{item.meta.title}}</div>
          </router-link>
        </template>
      </template>
      <!--<div class="LeftMenuItem" @click="logout" v-if="hasToken"><div>登出</div></div>-->
    </template>
    <template v-if="name=='Activity'">
      <div class="LeftMenuTitle">{{nowList.meta.title}}</div>
      <template v-for="(item,index) in getMenu">
        <router-link :key="index" :to="{name:item.name,query:$route.query}">
          <div class="LeftMenuItem">{{item.title}}</div>
        </router-link>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  props: ["name", "menu"],
  computed: {
    memberData() {
      return this.$store.state.memberData;
    },
    nowList() {
      // console.log(this.$router.options.routes.filter(x=>x.name==this.name)[0])
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
          if (data[i].Id == 7) data[i].name = "ActivityMap";
        }
        return data;
      } else {
        return false;
      }
    },
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
  },
};
</script>
