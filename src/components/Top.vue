<template>
  <div class="Top" :style="{ 'background-color': data.backgroundColor }">
    <div class="TopBox">
      <i
        class="el-icon-s-unfold TopBoxIcon"
        @click="$emit('getMenuSet', true)"
      ></i>
      <router-link class="TopBoxLogoBox" :to="{ name: 'index' }">
        <img
          class="TopBoxLogo"
          style="margin: 0 10px 0 0"
          :src="data.logo ? data.logo : '@/assets/logo.png'"
        />
        <img class="TopBoxLogo TopBoxLogo2" src="@/assets/enroll_title.png" />
      </router-link>
      <router-link :to="{ path: '/Member' }">
        <i class="el-icon-user-solid TopBoxIcon"></i>
      </router-link>
      <div class="TopBoxMenu">
        <a href="http://ma.wzu.edu.tw/bin/home.php" target="_blank">
          <div class="TopBoxMenuItem" :style="{ color: data.color }">
            舊版活動管理系統
          </div>
        </a>
        <a href="https://cal.wzu.edu.tw/wzfsDev/index.html#/Calendar/2">
          <div class="TopBoxMenuItem" :style="{ color: data.color }">
            行事曆
          </div>
        </a>
        <router-link :to="{ path: '/Activity' }">
          <div class="TopBoxMenuItem" :style="{ color: data.color }">
            活動列表
          </div>
        </router-link>
        <router-link :to="{ path: '/Member' }" v-if="hasToken && memberData">
          <div class="TopBoxMenuItem" :style="{ color: data.color }">
            {{ memberData.UserName }}
          </div>
        </router-link>
        <router-link :to="{ name: 'login' }" v-if="!hasToken">
          <div class="TopBoxMenuItem" :style="{ color: data.color }">登入</div>
        </router-link>
        <div
          class="TopBoxMenuItem"
          :style="{ color: data.color }"
          @click="logout"
          v-else
        >
          登出
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
    };
  },
  computed: {
    hasToken() {
      return localStorage.wenzao_CToken;
    },
    memberData() {
      return this.$store.state.memberData;
    },
  },
  async created() {
    this.data = await this.$api
      .GetMasterSetById({ Id: 1 })
      .then((res) => res.data.response);
    this.data = JSON.parse(this.data.Contents);
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
