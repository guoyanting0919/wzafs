<template>
  <div class="index">
    <!--<img
      class="indexImg"
      src="https://c011.wzu.edu.tw/datas/upload/Pictures/3729-招生banner-修2_工作區域1.jpg"
    />-->
    <el-carousel trigger="click" class="indexImg" height="290px" v-if="imgList.length > 0">
      <el-carousel-item v-for="(item, index) in imgList" :key="index">
        <div class="carouselItem">
          <!-- <img class="carouselItemImg" :src="item.Pic" /> -->
          <el-image @click="handleLink(item)" style="width: 1100px; height: 290px;cursor: pointer;" :src="item.Pic" fit="cover"></el-image>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="searchBar">
      <div style="display: flex; align-items: center">
        <Title :name="$router.currentRoute.meta.title"></Title>
        <a href="https://cal.wzu.edu.tw/wzfsDev/index.html#/Calendar/2">
          <el-button type="primary">行事曆</el-button>
        </a>
      </div>
      <div class="searchBarBox">
        <el-date-picker v-model="search.sDate" type="date" placeholder="開始日期" style="margin: 0 10px 0 0"></el-date-picker>
        <el-date-picker v-model="search.eDate" type="date" placeholder="結束日期" style="margin: 0 10px 0 0"></el-date-picker>
        <el-input suffix-icon="el-icon-search" v-model="search.key" placeholder="活動名稱、主辦單位" style="margin: 0 10px 0 0" @change="toSearch"></el-input>
        <el-button type="primary" @click="toSearch">搜尋</el-button>
      </div>
    </div>
    <el-table stripe :data="list.data" style="width: 100%" @sort-change="handleSortChange">
      <el-table-column label="序號" width="80px" sortable="custom" prop="Id">
        <template template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="活動名稱" prop="ActName" sortable="custom"></el-table-column>
      <el-table-column label="主辦單位" prop="ActOrganizer" sortable="custom"></el-table-column>
      <el-table-column label="活動日期" sortable="custom" prop="ActStartDate">
        <template template slot-scope="scope">
          <div>
            {{ $Function.YYYYMMDD(scope.row.ActStartDate) }} ~
            {{ $Function.YYYYMMDD(scope.row.ActEndDate) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="報名起訖日期" sortable="custom" prop="SignupStartDate">
        <template template slot-scope="scope">
          <div>
            {{ $Function.YYYYMMDD(scope.row.SignupStartDate) }} ~
            {{ $Function.YYYYMMDD(scope.row.SignupEndDate) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="已報名/上限數" prop="MaxUser" width="140px" sortable="custom">
        <template template slot-scope="scope">{{
          scope.row.RegisterUser + "/" + scope.row.MaxUser
        }}</template>
      </el-table-column>
      <el-table-column label="操作" width="80px">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Page :now="search.page" :count="list.pageCount" :rightPage="5" :leftPage="5" :max="search.intPageSize" @changePage="changePage" @changeMax="changeMax"></Page>
  </div>
</template>

<script>
// @ is an alias to /src
//import moment from "moment"
import Page from "@/components/Page";
import Title from "@/components/Title";
export default {
  name: "index",
  data() {
    return {
      list: [],
      imgList: [],
      search: {
        page: 1,
        key: "",
        sDate: "",
        eDate: "",
        strOrderByFileds: "ActStartDate descending",
        intPageSize: 20,
      },
    };
  },
  components: { Page, Title },
  created() {
    this.getData();
  },
  methods: {
    handleSortChange({ column, prop, order }) {
      const vm = this;
      order == null ? (order = "ascending") : (order = order);
      vm.search.strOrderByFileds = `${prop} ${order}`;
      vm.getData();
    },
    handleDetail(row) {
      let route = this.$router.resolve({
        name: "ActivityDetail",
        query: { Id: row.Id },
      });
      window.open(route.href, "_blank");
    },
    async getData() {
      this.$store.dispatch("loading", true);
      this.list = await this.$api
        .GetActivity(this.search)
        .then((res) => res.data.response);
      this.$api.GetBanner({ page: 1, key: "" }).then((res) => {
        this.imgList = res.data.response.data.sort((a, b) => {
          return a.Sort - b.Sort;
        });
      });
      this.$store.dispatch("loading", false);
    },
    changePage(x) {
      this.search.page = x;
      this.getData();
    },
    changeMax(x) {
      this.search.intPageSize = x;
      this.getData();
    },
    toSearch() {
      this.search.page = 1;
      this.getData();
    },
    handleLink({ LinkUrl }) {
      console.log();
      if (LinkUrl) {
        window.open(LinkUrl);
      }
    },
  },
};
</script>
