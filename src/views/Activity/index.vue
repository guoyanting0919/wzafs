<template>
  <div class="contentBox">
    <LeftMenu :name="'Activity'" :menu="ActivityData.MenuSort"></LeftMenu>
    <div class="Activity">
      <Breadcrumb></Breadcrumb>
      <el-tabs type="card" v-model="now" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in getMenu"
          :label="item.title"
          :name="item.name"
          :key="index"
          @click="$router.push({ name: item.name, query: $route.query })"
        ></el-tab-pane>
      </el-tabs>
      <Title
        :name="$router.currentRoute.meta.title + ' - ' + ActivityData.ActName"
      ></Title>
      <router-view :data="ActivityData" v-if="ActivityData" />
      <!--<GoBack></GoBack>-->
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Breadcrumb from "@/components/Breadcrumb.vue";
import Title from "@/components/Title.vue";
import LeftMenu from "@/components/LeftMenu.vue";
//import GoBack from '@/components/GoBack.vue'
export default {
  data() {
    return {
      ActivityData: "",
      now: this.$router.currentRoute.name,
    };
  },
  components: { Breadcrumb, Title, LeftMenu },
  watch: {
    $route(to) {
      this.now = to.name;
    },
  },
  computed: {
    MenuSort() {
      return JSON.parse(this.ActivityData.MenuSort).filter((res) => res.Enable);
    },
    getMenu() {
      if (
        this.ActivityData.MenuSort &&
        JSON.parse(this.ActivityData.MenuSort)
      ) {
        let data = JSON.parse(this.ActivityData.MenuSort).filter(
          (res) => res.Enable
        );
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
  async created() {
    this.$store.dispatch("loading", true);
    this.ActivityData = await this.$api
      .GetActivityById({ Id: this.$router.currentRoute.query.Id })
      .then((res) => res.data.response);
    if (moment(this.ActivityData.ShowDate).isAfter(moment())) {
      alert("未達活動公布時間");
      this.$router.push({ name: "index" });
      return 0;
    }
    if (moment().isAfter(moment(this.ActivityData.EndDate))) {
      alert("活動公布時間已過");
      this.$router.push({ name: "index" });
      return 0;
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      this.$router.push({ name: tab.name, query: this.$route.query });
    },
  },
  mounted() {
    console.log(this.$route.query);
  },
};
</script>