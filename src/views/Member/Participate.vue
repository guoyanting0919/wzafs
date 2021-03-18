<template>
  <div class="Participate">
    <el-dialog :close-on-click-modal="false" title="報名資料" :visible.sync="formDataShow">
      <div class>
        <el-form label-width="50%">
          <table border="1" class="formDataTable">
            <tr v-for="(item, index) in formDataList" :key="index">
              <td>{{ item }}</td>
              <td>{{ formData[item] }}</td>
            </tr>
          </table>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog :close-on-click-modal="false" title="報到" :visible.sync="QRCodeShow">
      <div style="display: flex; justify-content: center">
        <img :src="QRCodeURl" />
      </div>
    </el-dialog>

    <div class="searchBar">
      <div style="display: flex; align-items: center">
        <Title :name="$router.currentRoute.meta.title"></Title>
      </div>
      <div>
        <el-input suffix-icon="el-icon-search" v-model="search.key" placeholder="關鍵字" @change="
            search.page = 1;
            getData();
          " style="margin-right: 10px"></el-input>
        <el-button type="primary" @click="
            search.page = 1;
            getData();
          ">搜尋</el-button>
        <el-button type="warning" @click="exportData">匯出</el-button>
      </div>
    </div>
    <el-table stripe :data="list.data" style="width: 100%" @sort-change="handleSortChange">
      <el-table-column prop="ActName" label="活動名稱" sortable="custom"></el-table-column>
      <el-table-column prop="ActStartDate" label="活動日期" sortable="custom">
        <template template slot-scope="scope">
          <div style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            ">
            <div>{{ $Function.YYYYMMDDHHmm(scope.row.ActStartDate) }}</div>
            <div>|</div>
            <div>{{ $Function.YYYYMMDDHHmm(scope.row.ActEndDate) }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="ActOrganizer" label="主辦單位" sortable="custom"></el-table-column>
      <el-table-column prop="Status" label="參與狀態" sortable="custom" width="100px">
        <template slot-scope="scope">{{
          $store.state.EventStatus[scope.row.Status]
        }}</template>
      </el-table-column>
      <el-table-column prop="RegisterDate" label="報名時間" sortable="custom" width="150px">
        <template slot-scope="scope">{{
          $Function.YYYYMMDDHHmm(scope.row.RegisterDate)
        }}</template>
      </el-table-column>
      <el-table-column label="操作" width="360px">
        <template slot-scope="scope">
          <!--<template slot-scope="scope">-->
          <div class="TableButtonList">
            <!--<el-button @click="$router.push({name:'ActivityDetail',query:{Id:scope.row.Id}})">查看</el-button>-->
            <el-button @click="showQRCode(scope.row)" v-if="scope.row.Status == 0 && scope.row.HasPwd">報到</el-button>
            <el-button @click="GetRegisterData(scope.row)">報名資料</el-button>
            <el-button type="primary" @click="showPreview(scope.row)" v-if="scope.row.UserRegisterNo">證書</el-button>
            <el-button type="danger" @click="UpdateBatchMeeting('1', scope.row.Id)" v-if="!scope.row.UserRegisterNo && scope.row.Status != 4">取消</el-button>
            <!--<el-button type="danger" @click="del(scope.row.Id)" v-if="!scope.row.UserRegisterNo&&scope.row.Status!=4">取消</el-button>-->
          </div>
        </template>
      </el-table-column>
    </el-table>
    <Page :now="search.page" :count="list.pageCount" :rightPage="5" :leftPage="5" @changePage="changePage"></Page>
    <CertificatePreview :user="userData" :act="actData" :img="CertificateTemp.CertBackImg" :text="CertificateTempType[0].CertContents" ref="Preview" v-if="
        CertificateTemp &&
        CertificateTemp.CertBackImg &&
        CertificateTempType[0] &&
        CertificateTempType[0].CertContents
      "></CertificatePreview>
  </div>
</template>
<script>
import axios from "axios";
import Page from "@/components/Page";
import CertificatePreview from "@/components/CertificatePreview.vue";
import Title from "@/components/Title.vue";
export default {
  data() {
    return {
      list: [],
      search: {
        Id: this.$store.state.memberData.Id,
        page: 1,
        key: "",
        strOrderByFileds: "Id",
      },
      actData: "",
      userData: "",
      formData: "",
      formDataShow: false,
      QRCodeShow: false,
      QRCodeURl: "",
      CertificateTemp: "",
      CertificateTempType: "",
    };
  },
  components: { Page, CertificatePreview, Title },
  async created() {
    await this.getData();
  },
  computed: {
    formDataList() {
      return Object.keys(this.formData);
    },
  },
  mounted() {
    if (!localStorage.wenzao_CToken) {
      this.$router.push({ name: "login" });
    }
  },
  methods: {
    async getData() {
      this.$store.dispatch("loading", true);
      this.list = await this.$api
        .GetByMemberId(this.search)
        .then((res) => res.data.response);
      this.$store.dispatch("loading", false);
    },
    async showQRCode(x) {
      this.$store.dispatch("loading", true);
      await this.$api
        .GetImage({ actId: x.ActivityId, memId: x.MemberId })
        .then((res) => {
          this.QRCodeURl = res.data.response;
        });
      this.QRCodeShow = true;
      this.$store.dispatch("loading", false);
    },
    handleSortChange({ column, prop, order }) {
      const vm = this;
      order == null ? (order = "ascending") : (order = order);
      vm.search.strOrderByFileds = `${prop} ${order}`;
      vm.getData();
    },
    changePage(x) {
      this.search.page = x;
      this.getData();
    },
    async del(x) {
      let flag = confirm("確定取消?");
      if (!flag) return 0;
      const vm = this;
      await vm.$api
        .DeleteActivityRegister({
          Id: x,
        })
        .then((res) => {
          alert(res.data.msg);
        });
      await vm.getData();
    },
    async UpdateBatchMeeting(uType, x) {
      const vm = this;
      let data = [x];
      let params = {
        uType,
        uValue: 4,
        uService: "",
      };
      await vm.$api.UpdateBatchMeeting(params, data).then((res) => {
        vm.serviceName = "";
        vm.eventStatus = "";
        vm.JoinType = "";
        vm.isTeach = "";
        vm.updatedIds = [];
        if (res.data.success) {
          alert("取消成功");
        } else {
          alert("取消失敗");
        }
      });
      await this.getData();
    },
    delay(x) {
      return new Promise(function (resolve) {
        setTimeout(() => {
          resolve();
        }, x);
      });
    },
    async showPreview(x) {
      /*this.actData = await this.$api
        .GetActivityById({ Id: x })
        .then((res) => res.data.response);
      if (!this.actData.CertificateId) {
        alert("該活動沒設置證書底圖");
        return 0;
      }
      this.$store.dispatch("loading", true);

      this.userData = await this.$api
        .GetMemberById({ Id: this.$store.state.memberData.Id })
        .then((res) => res.data.response);
      this.CertificateTemp = await this.$api
        .GetCertificateContentById({ id: this.actData.CertificateId })
        .then((res) => res.data.response);
      this.CertificateTempType = await this.$api
        .GetCertificateContentByActivityId({ ActivityId: x })
        .then((res) => res.data.response);
      await this.delay(500);
      this.$refs.Preview.toPrint();
      this.$store.dispatch("loading", false);*/
      window.open(this.$store.state.fileBase + x.UserRegisterNo + ".pdf");
    },
    async GetRegisterData(x) {
      let obj = {
        actId: x.ActivityId,
        memberId: x.MemberId,
      };
      this.formData = (
        await this.$api.GetRegisterData(obj).then((res) => res.data)
      )[0];
      console.log(this.formDataList);
      this.formDataShow = true;
    },
    async exportData() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.wenzao_CToken}`,
        },
        responseType: "blob", //// 回應類型為 blob
      };
      axios
        .get(
          process.env.VUE_APP_OIDC_BASEURL +
            "ActivityRegister/GetActivityRegisterByMemberIdExport?Id=" +
            this.$store.state.memberData.Id +
            "&page=1&key=&strOrderByFileds=Id",
          config
        )
        .then((res) => {
          let blob = new Blob([res.data], {
            type: "application/" + res.headers["content-type"],
          });
          let downloadElement = document.createElement("a");
          let href = window.URL.createObjectURL(blob); // 創建下載的鏈接
          downloadElement.href = href;
          downloadElement.download = "匯出.xlsx"; // 下載後文件名
          // 此寫法兼容可火狐瀏覽器
          document.body.appendChild(downloadElement);
          downloadElement.click(); // 點擊下載
          document.body.removeChild(downloadElement); // 下載完成移除元素
          window.URL.revokeObjectURL(href); // 釋放掉 blob 對象
        });
    },
  },
};
</script>