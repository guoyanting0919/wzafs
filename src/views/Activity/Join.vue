<template>
  <div class="Join">
    <el-dialog :close-on-click-modal="false" title="個資同意書" :visible.sync="showIndividual" :show-close="false">
      <div class="agreeBook" v-html="Individual.Contents"></div>
      <div class="elBoxbuttonList">
        <div class="elBoxbuttonListCheckbox">
          <el-checkbox v-model="isAgree">我同意以上條款</el-checkbox>
        </div>
        <div class="elBoxbuttonList__chooseFunc">
          <el-button @click="showIndividual = false" :disabled="!isAgree">繼續</el-button>
          <el-button @click="disAgree" :disabled="isAgree">不同意</el-button>
        </div>
      </div>
    </el-dialog>
    <FormModelTable ref="form" :data="list.FormDtlDTO" v-if="list.FormDtlDTO && list.FormDtlDTO.length > 0"></FormModelTable>
    <div class="buttonList">
      <el-button type="primary" @click="sub" :disabled="!isAgree">{{
        data.AddButtonLab ? data.AddButtonLab : "確認資料"
      }}</el-button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import FormModelTable from "@/components/FormModelTable";
export default {
  props: ["data"],
  data() {
    return {
      list: "",
      Individual: "",
      showIndividual: true,
      isAgree: false,
    };
  },
  components: { FormModelTable },
  computed: {
    requiredNum() {
      return this.list.FormDtlDTO.filter((res) => res.ColumnSet == 1);
    },
  },
  async created() {
    this.list = await this.$api
      .GetFormById({ Id: this.data.FormId })
      .then((res) => res.data.response);
    this.Individual = await this.$api
      .GetIndividualStatementModuleById({ Id: this.data.IndividualStatementId })
      .then((res) => res.data);
    this.$store.dispatch("loading", false);
    this.checkActivity();

    if (moment(this.data.SignupStartDate).isAfter(moment())) {
      alert("報名未開始");
      this.$router.push({ name: "index" });
      return 0;
    }
    if (moment().isAfter(moment(this.data.SignupEndDate))) {
      alert("報名已結束");
      this.$router.push({ name: "index" });
      return 0;
    }
  },
  methods: {
    disAgree() {
      this.$router.go(-1);
    },
    checkActivity() {
      if (this.data.RegisterUser >= this.data.MaxUser) {
        alert("報名人數已達上限");
        this.$router.push({ name: "index" });
        return 0;
      }
    },
    async sub() {
      let sure = confirm("確定報名?");
      if (!sure) return 0;
      let form = {
        id: 0,
        memberId: this.$store.state.memberData.Id,
        activityId: this.data.Id,
        status: 0,
        joinType: 2,
      };
      console.log(this.$refs);
      let data = this.$refs.form.showRow();
      let re = this.requiredInput();
      if (re.length > 0) {
        for (let i in re) {
          alert("「" + re[i].Name + "」" + "未填");
        }
        return 0;
      }

      if (!(await this.IsKeyWordInput())) return 0;

      this.$store.dispatch("loading", true);
      let flag = await this.$api
        .PostActivityRegister(form)
        .then((res) => res.data);
      if (flag.success) {
        for (let i in data) {
          data[i].ActivityRegisterId = flag.response;
          data[i].FormDtlId = data[i].Id;
        }
        let flag2 = await this.$api
          .PostActivityRegisterDtl(data)
          .then((res) => res.data);
        if (flag2.success) {
          alert(
            this.data.SuccessMsg ? this.data.SuccessMsg : "恭喜您完成本次報名"
          );
          this.$router.push({ name: "index" });
        } else {
          alert(flag2.msg);
        }
      } else {
        alert(flag.msg);
      }
      this.$store.dispatch("loading", false);
    },
    requiredInput() {
      let data = this.$refs.form.showRow();
      let re = data.filter(
        (res) =>
          this.requiredNum
            .map(function (e) {
              return e.Id;
            })
            .indexOf(res.Id) != -1 &&
          (!res.inputVal || res.inputVal == "[]")
      );
      for (let i in re) {
        for (let j in this.list.FormDtlDTO) {
          if (re[i].Id == this.list.FormDtlDTO[j].Id) {
            re[i].Name = this.list.FormDtlDTO[j].ColumnName;
          }
        }
      }
      return re;
    },
    async IsKeyWordInput() {
      //檢查欄位是否重複
      let flag = true;
      let flag1 = true;
      let data = this.$refs.form.showRow();
      console.log(data);
      for (let item of data) {
        if (this.IsKeyWord(item.Id)) {
          if (flag1) {
            let Repeat = await this.isRepeat(item.Id);
            // if (Repeat.some((res) => res.InputVal == item.inputVal)) {
            //   // alert(item.inputVal + "已被別人使用");
            //   alert("您已報名此活動");
            //   flag = false;
            // }
            flag1 = false;
          }
        }
      }
      return flag;
    },
    IsKeyWord(x) {
      //檢查該欄位是否唯一值
      let data = this.list.FormDtlDTO.filter((res) => res.Id == x);
      return data[0].IsKeyWord;
    },
    async isRepeat(x) {
      //尋找已報名名單的特定欄位
      let Register = await this.$api
        .GetActivityRegisterById({
          ActivityId: this.$router.currentRoute.query.Id,
        })
        .then((res) => res.data.response);
      let arr = [];
      for (let item of Register) {
        arr.push(
          ...item.ActivityRegisterFormDtlViewModel.filter(
            (res) => res.FormDtlId == x
          )
        );
      }
      // console.log(arr);
      return arr;
    },
  },
};
</script>