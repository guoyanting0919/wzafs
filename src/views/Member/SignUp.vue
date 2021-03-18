<template>
  <div class="SignUp">
    <el-dialog
      ref="elBox"
      :close-on-click-modal="false"
      title="文藻外語大學「活動報名系統」會員使用註冊條款 2018/12/10"
      :visible.sync="agree"
      :show-close="false"
    >
      <div>
        歡迎您申請加入文藻外語大學「活動報名系統」，所有申請本系統服務之使用者(以下稱會員)，都應該詳細閱讀下列使用條款，這些使用條款訂立的目的，是為了保護會員服務的提供者以及所有使用者的利益，並構成使用者與會員服務提供者之間的契約。
        <br />
        <br />壹、認知與接受條款：
        <br />
        <br />會員完成註冊手續或開始使用本系統提供之會員服務時，即視為已完全同意並接受本使用條款的所有約定。如果您不同意本約定書的內容，或者您所屬的國家或地域排除本約定書內容之全部或一部時，您應立即停止使用本系統。
        <br />
        <br />若您未滿二十歲，除應符合上述規定外，並應於您的家長（或監護人）閱讀、瞭解並同意本約定書之所有內容及其後修改變更後，方得使用或繼續使用本系統。當您使用或繼續使用本系統時，即表示您的家長（或監護人）已閱讀、瞭解並同意接受本約定書之所有內容及其後修改變更。
        <br />
        <br />貳、個人資料蒐集告知聲明：
        <br />
        <br />一、文藻外語大學(以下簡稱本校)為蒐集、處理、利用您的個人資料，依個人資料保護法第8條之規定以本同意書向您進行告知。當您將資料送出後，表示您已閱讀、並瞭解本同意書之所有內容。
        <br />
        <br />二、為了達成一○九教育或訓練行政、一五七調查、統計與研究分析、○七八計畫、管制考核與其他研考管理之特定目的，我們會向您蒐集Ｃ○○一辨識個人者(姓名、單位、電子郵遞地址)、Ｃ○一一個人描述（性別）、Ｃ○○三政府資料中之辨識者(所屬單位)與Ｃ○五一學校紀錄（大學、專科或其他學校）之個人資料。
        <br />
        <br />三、本校會將您的個人資料於中華民國境內進行利用，對象僅限於本校和政府部門，於上述蒐集之特定目的消失前，以自動化或半自動化方式及電子方式或紙本方式利用您的個人資料。
        <br />
        <br />四、
        您得利用本校個資事件聯絡窗口電子郵件信箱(pims@mail.wzu.edu.tw)寄送本校權利行使申請書，依個資法第10、11條，行使以下權利，惟如符合法定例外事由，本校得依法拒絕您的權利行使：(一)請求查詢或閱覽。(二)請求製給複製本。(三)請求補充或更正。(四)請求停止蒐集、處理或利用。(五)請求刪除。
        <br />
        <br />五、您得自由選擇是否提供單位、姓名、電子郵遞地址，惟若不提供，本校將無法提供您活動通知、活動資料寄送之服務。
        <br />
        <br />參、註冊須知及義務：
        <br />
        <br />為了能使用本服務，您同意以下事項：
        <br />
        <br />一、依本系統加入會員資料表之提示提供您本人正確、最新及完整的資料。
        <br />
        <br />二、維持並更新您個人資料，確保其為正確、最新及完整。若因您提供任何錯誤或不實的資料，而發生的損失，由您自行負責。
        <br />
        <br />三、若您的個人資料填寫錯誤、不實、過時、不完整、有任何誤導之嫌，或本系統有合理之理由懷疑您提供之資料為錯誤、不實、過時、不完整或有任何誤導，本系統有權暫停或終止您的帳號及您的使用資格，並拒絕您使用各項服務之權利。
        <br />
        <br />四、為維護所有會員權益，請勿重覆加入會員！一經發現，本系統有權暫停或終止您的帳號及您的使用資格，並拒絕您使用各項服務之權利。
        <br />
        <br />肆、會員帳號、密碼及安全：
        完成本系統的登記程序之後，您將擁有一組帳號及密碼。維持帳號及密碼的機密安全，是您的責任。利用該密碼及帳號所進行的一切行動，您將負完全的責任。您並同意以下事項：
        <br />
        <br />一、您的密碼或帳號遭到盜用或有其他任何安全問題發生時，您將立即通知相關人員。
        <br />
        <br />二、每次連線完畢，均結束您的帳號使用（登出本系統）。
        <br />
        <br />三、會員不得將「會員帳號」轉讓或借予他人；如經查證前述事實者，將終止會員之所有權益。若本校發現疑似遭盜用之「會員帳號」，將立即終止該「會員帳號」之使用權。
        <br />
        <br />如您未能遵守本項規定而衍生之任何損失或損害，本站無法也不予負責。
        <br />
        <br />※為避免您的「會員帳號」被盜用，請務必做好以下的防範措施：
        <br />
        <br />一、避免設定過於簡單易猜的「會員帳號」和「會員密碼」。
        <br />
        <br />二、設定「會員密碼」時，請避免與「會員帳號」相同。
        <br />
        <br />三、請勿將「會員帳號」和「會員密碼」透露給其他人。
        <br />
        <br />四、在網咖等公共場所離開座位時請先登出本系統。
        <br />
        <br />五、請勿安裝非法或來路不明的外掛程式。
        <br />
        <br />六、若有任何人假藉活動名義要向您索取「會員帳號」、「會員密碼」、身分證字號時，請特別留意，勿輕信而將「會員帳號」、「會員密碼」告知對方。
        <br />
        <br />伍、使用者的守法義務及承諾：
        您承諾絕不為任何非法目的或以任何非法方式使用本系統，並承諾遵守中華民國相關法規及一切使用網際網路之國際慣例。您若係中華民國以外之使用者，並同意遵守所屬國家或地域之法令。您同意並保證不得利用本系統從事侵害他人權益或違法之行為，包括但不限於：
        <br />
        <br />(一)侵害他人名譽、隱私權、營業秘密、商標權、著作權、專利權、其他智慧財產權及其他權利。
        <br />
        <br />(二)違反依法律或契約所應負之保密義務。
        <br />
        <br />(三)冒用他人名義使用本系統。
        <br />
        <br />(四)傳輸或散佈電腦病毒。
        <br />
        <br />(五)其他本系統有正當理由認為不適當之行為。
        <br />
        <br />陸、服務更新、終止、暫停或中斷提供服務：
        <br />
        <br />下列情形之一時，本校有權停止或中斷提供服務：
        <br />
        <br />(一)「本系統」之資訊設備進行必要之保養及施工時。
        <br />
        <br />(二)資訊設備發生故障時。
        <br />
        <br />(三)本校相關資訊合作廠商，無法提供必要之服務時。
        <br />
        <br />(四)天災等不可抗力之因素造成服務中止時。
        <br />
        <br />(五)會員瞭解並同意，本校可能因公司、其他合作廠商或相關電信業者網路系統軟硬體設備之故障或失靈、或人為操作上之疏失而全部或一部中斷、暫時無法使用、遲延、或造成資料傳輸或儲存上之錯誤、或遭第三人侵入系統篡改或偽造變造資料等，會員不得因此而要求任何補償或賠償。
        <br />
        <br />(六) 會員瞭解並同意本校基於自身考量關閉且中止該系統之全部使用。
        <br />
        <br />本系統有時可能會出現中斷或故障等現象，或許將造成您使用上的不便、資料喪失、錯誤、遭人篡改或其他經濟上損失等情形。您於使用本系統時宜自行採取防護措施。對於您因使用（或無法使用）本系統而造成的損害，本校不負任何賠償責任。
        <br />
        <br />柒、關於使用及儲存之一般措施：
        <br />
        <br />您同意本校得就本系統訂定一般措施及限制；您也同意，本校有權依其自行之考量，不論通知與否，隨時變更這些一般措施及限制。您亦同意，長時間未使用的帳號，本校有權關閉。
        <br />
        <br />捌、資訊或建議：
        本校對於您使用本系統而取得之資訊或建議，不擔保其為完全正確無誤。本校對於本系統所提供之資訊或建議有權隨時修改或刪除。您在做出任何相關規劃與決定之前，仍應請教專業人員針對您的情況提出意見，以符合您的個別需求。
        <br />
        <br />玖、會員行為：
        <br />
        <br />您了解本校並未針對「會員內容」事先加以審查，但本校有權（但無義務）依其自行之考量，拒絕或移除經由本系統提供之任何「會員內容」。在不限制前開規定之前提下，本校及其指定人有權將違反本系統條款和違反公共秩序善良風俗之任何「會員內容」加以移除。您使用任何「會員內容」時，就前開「會員內容」之正確性、完整性或實用性之情形，您同意必須自行加以評估並承擔所有風險。
        您了解並同意，本校依據法律的要求，或基於以下目的之合理必要範圍內，認定必須將「會員內容」加以保存或揭露予政府機關、司法警察或未成年人之監護人時，得加以保存及揭露：（A）遵守法令或政府機關之要求及法律程序，（B）執行本系統條款，（C）回應任何侵害第三人權利之主張，或（D）保護本校及其使用者及公眾之權利、財產或個人安全。
        <br />
        <br />壹拾、拒絕或終止您的使用：
        <br />
        <br />您同意本校得基於其自行之考量，得因任何理由，終止您的會員密碼、會員帳號（或其任何部分）或本系統之使用，並將本系統內任何「會員內容」加以移除並刪除。
        <br />
        <br />壹拾壹、準據法與管轄法院：
        <br />
        <br />本約定書之解釋與適用，以及與本約定書有關的爭議，均應依照中華民國法律予以處理，並以台灣高雄地方法院為第一審管轄法院。
        <br />
        <br />
      </div>
      <div class="elBoxbuttonList">
        <div class="elBoxbuttonListCheckbox">
          <el-checkbox v-model="isAgree">我同意以上條款</el-checkbox>
        </div>
        <el-button @click="agree = false" :disabled="!isAgree">繼續</el-button>
      </div>
    </el-dialog>

    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <p class="red" style="text-align: center">
        在校教職員不需註冊帳號，帳號、密碼同校務資訊系統。
      </p>
      <el-form-item label="會員帳號" prop="UserAccount">
        <div style="display: flex">
          <el-input v-model="form.UserAccount"></el-input>
          <el-button type="primary" @click="checkUserAccountButton"
            >檢查帳號是否重複</el-button
          >
        </div>
      </el-form-item>
      <el-form-item label="會員密碼" prop="UserPwd">
        <el-input v-model="form.UserPwd" show-password></el-input>
      </el-form-item>
      <el-form-item label="確認密碼" prop="reUserPwd">
        <el-input v-model="form.reUserPwd" show-password></el-input>
      </el-form-item>
      <el-form-item label="您的姓名" prop="UserName">
        <el-input v-model="form.UserName"></el-input>
      </el-form-item>
      <el-form-item label="電子郵件" prop="UserEmail">
        <div style="display: flex">
          <el-input v-model="form.UserEmail"></el-input>
          <el-button
            type="primary"
            @click="sendEmail"
            :disabled="
              !emailCheckForButton(form.UserEmail) && !form.verificationStep
            "
            >驗證電子信箱</el-button
          >
        </div>
      </el-form-item>
      <el-form-item
        label="信箱驗證碼"
        prop="UserSchool"
        v-if="form.verificationStep"
      >
        <el-input v-model="form.verificationCode"></el-input>
      </el-form-item>
      <el-form-item label="學校/組織名稱" prop="UserSchool">
        <el-input v-model="form.UserSchool"></el-input>
      </el-form-item>
      <el-form-item label="所屬單位" prop="UnitName">
        <el-input v-model="form.UnitName"></el-input>
      </el-form-item>
      <el-form-item label="性別" prop="Sex">
        <el-radio-group v-model="form.Sex">
          <el-radio :label="'男'">男</el-radio>
          <el-radio :label="'女'">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身分證字號" prop="UID">
        <el-input v-model="form.UID"></el-input>
        <p class="red">若無身分證字號，請填居留證或護照號碼</p>
      </el-form-item>
    </el-form>
    <div class="buttonList">
      <el-button type="danger" @click="clear">重新輸入</el-button>
      <el-button type="primary" @click="sub">填寫完成</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        Id: 0,
        UserAccount: "",
        UserPwd: "",
        UserName: "",
        UserEmail: "",
        UserSchool: "",
        UnitName: "",
        UnitCode: "",
        UID: "",
        Sex: "",
        Source: "",
        reUserPwd: "",
        verificationCode: "",
        verificationStep: false,
        verificationComplete: false,
      },
      rules: {
        UserAccount: [
          {
            required: true,
            message: "帳號不可只有純數字，可包含大寫英文、小寫英文，或數字",
            trigger: "blur",
            validator: this.accountCheck,
          },
        ],
        UserPwd: [
          {
            required: true,
            message:
              "密碼不可只有純數字，可包含大寫英文、小寫英文，或數字，至少需八碼",
            trigger: "blur",
            validator: this.passwordCheck,
          },
        ],
        reUserPwd: [
          {
            required: true,
            message: "密碼輸入不一致",
            trigger: "blur",
            validator: this.reUserPwdCheck,
          },
        ],
        UserName: [{ required: true, message: "必填", trigger: "blur" }],
        UserEmail: [
          {
            required: true,
            message: "格式不符合Email",
            trigger: "blur",
            validator: this.emailCheck,
          },
        ],
        UserSchool: [{ required: true, message: "必填", trigger: "blur" }],
        UnitName: [{ required: true, message: "必填", trigger: "blur" }],
        UID: [{ required: true, message: "必填", trigger: "blur" }],
        Sex: [{ required: true, message: "必填", trigger: "blur" }],
      },
      isAgree: false,
      agree: true,
    };
  },
  methods: {
    passwordCheck(rule, value, callback) {
      const re = /^\d+$/;
      if (re.test(value) || value.length < 8) return callback(new Error(""));
      else callback();
    },
    emailCheck(rule, value, callback) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(value)) return callback(new Error(""));
      else callback();
    },
    emailCheckForButton(value) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(value)) return true;
      else false;
    },
    accountCheck(rule, value, callback) {
      const re = /^\d+$/;
      if (re.test(value)) return callback(new Error(""));
      else callback();
    },
    reUserPwdCheck(rule, value, callback) {
      if (value == this.form.UserPwd) callback();
      else return callback(new Error(""));
    },
    UIDToCheck(rule, value, callback) {
      if (this.UIDCheck(value)) callback();
      else return callback(new Error(""));
    },
    UIDCheck(x) {
      var flag = false;
      var arr = [
        ["A", 10],
        ["B", 11],
        ["C", 12],
        ["D", 13],
        ["E", 14],
        ["F", 15],
        ["G", 16],
        ["H", 17],
        ["I", 34],
        ["J", 18],
        ["K", 19],
        ["L", 20],
        ["M", 21],
        ["N", 22],
        ["O", 35],
        ["P", 23],
        ["Q", 24],
        ["R", 25],
        ["S", 26],
        ["T", 27],
        ["U", 28],
        ["V", 29],
        ["X", 30],
        ["Y", 31],
        ["W", 32],
        ["Z", 33],
      ];
      var num = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];
      var count = 0;
      if (x.length != 10) {
        return false;
      } else if (x.substr(1, 1) != 1 && x.substr(1, 1) != 2) {
        return false;
      } else {
        for (let i in arr) {
          if (x[0] == arr[i][0]) {
            x = arr[i][1] + x.substr(1, 10);
          }
        }
        for (let i in num) {
          count += x[i] * num[i];
        }
        if (count % 10 == 0) {
          flag = true;
        }
        return flag;
      }
    },
    clear() {
      this.form = {
        Id: 0,
        UserAccount: "",
        UserPwd: "",
        UserName: "",
        UserEmail: "",
        UserSchool: "",
        UnitName: "",
        UnitCode: "",
        UID: "",
        Sex: "",
        Source: "",
        verificationCode: "",
        verificationStep: true,
      };
    },
    async sub() {
      if (!(await this.checkUserAccount())) {
        alert("此帳號已被使用");
        return 0;
      }
      if (!this.form.verificationStep) {
        alert("請完成'驗證電子信箱'之手續");
        return 0;
      }
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          return 0;
        } else {
          this.$store.dispatch("loading", true);
          let flag = await this.$api
            .PostMember(this.form)
            .then((res) => res.data);
          if (flag.success) {
            alert("註冊成功!");
            this.$router.push({ name: "login" });
          } else {
            alert("註冊失敗!");
          }
          this.$store.dispatch("loading", false);
        }
      });
    },
    async checkUserAccount() {
      const re = /^\d+$/;
      if (!this.form.UserAccount) return "empty";
      if (re.test(this.form.UserAccount)) return "notPass";

      return await this.$api
        .CheckMemberAccount({ account: this.form.UserAccount })
        .then((res) => res.data.response);
    },
    async checkUserAccountButton() {
      let flag = await this.checkUserAccount();
      if (flag === true) {
        alert("此帳號可使用");
      }
      if (flag === false) {
        alert("此帳號已被使用");
      }
      if (flag === "empty") {
        alert("帳號不可空白");
      }
      if (flag === "notPass") {
        alert("帳號不符合規則");
      }
    },
    async sendEmail() {
      this.$store.dispatch("loading", true);
      await this.$api
        .SendRegistCode({ TargetEmail: this.form.UserEmail })
        .then((res) => {
          if (res.data.success) {
            alert("帶有驗證碼之信件已寄到" + this.form.UserEmail + ",請查收");
            this.form.verificationStep = true;
          } else {
            alert(res.data.msg);
          }
        });
      this.$store.dispatch("loading", false);
    },
  },
};
</script>