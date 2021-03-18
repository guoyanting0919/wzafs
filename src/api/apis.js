import req from "./https";

// 全域 api 掛載於 Vue.prototype
// 使用方式 this.$api
// api 命名原則 首字大寫爾後駝峰
const api = {
  // Login
  GetClientToken(params) {
    return req("get", "Login/GetClientToken", params);
  },
  GetAdminToken(params) {
    return req("get", "Login/GetAdminToken", params);
  },
  GetInfoByToken(params) {
    return req("get", "Login/GetInfoByToken", params);
  },
  GetClientInfoByToken(params) {
    return req("get", "Login/GetClientInfoByToken", params);
  },
  GetNavigationBar(params) {
    return req("get", "Permission/GetNavigationBar", params);
  },
  RefreshToken(params) {
    return req("get", "Login/RefreshToken/api/RefreshToken", params);
  },

  // Roles
  GetRoles(params) {
    return req("get", "Role/Get", params);
  },
  GetAllRoles() {
    return req("get", "Role/GetRoles");
  },
  DeleteRole(params) {
    return req("delete", "Role/Delete", params);
  },
  SearchRoles(params) {
    return req("get", "Role/Get", params);
  },
  AddRole(params) {
    return req("post", "Role/Post", params);
  },
  EditRole(params) {
    return req("put", "Role/put", params);
  },

  // AdminUsers
  GetAdminUsers(params) {
    return req("get", "AdminUser/Get", params);
  },
  AddAdminUser(params) {
    return req("post", "AdminUser/Post", params);
  },
  DeleteAdminUser(params) {
    return req("delete", "AdminUser/Delete", params);
  },
  GetAdminUserById(params) {
    return req("get", "AdminUser/GetAdminUserById", params);
  },
  EditAdminUserById(params) {
    return req("put", "AdminUser/Put", params);
  },

  // Authority
  GetAuthority(params) {
    return req("get", "Permission/GetPermissionTree", params);
  },
  GetPermissionByRid(params) {
    return req("get", "Permission/GetPermissionIdByRoleId", params);
  },
  EditPermissionByRid(params) {
    return req("post", "Permission/Assign", params);
  },

  // School
  GetUsers(params) {
    return req("get", "School/GetUsers", params);
  },
  GetOrg() {
    return req("get", "School/GetUnits");
  },
  GetUnits() {
    return req("get", "School/GetUnitList");
  },

  // Calendar EventType
  GetEventType() {
    return req("get", "EventType/GetList");
  },
  SearchEventType(params) {
    return req("get", "EventType/Get", params);
  },
  AddEventType(params) {
    return req("post", "EventType/Post", params);
  },
  DeleteEventType(params) {
    return req("delete", "EventType/Delete", params);
  },
  EditEventType(params) {
    return req("put", "EventType/Put", params);
  },

  //  Calendar Event
  GetEventsPage(params) {
    return req("get", "CalendarEvent/Get", params);
  },
  AddEvent(params) {
    return req("post", "CalendarEvent/Post", params);
  },
  EditEvent(params) {
    return req("put", "CalendarEvent/Put", params);
  },
  DeleteEvent(params) {
    return req("delete", "CalendarEvent/Delete", params);
  },
  SearchEvent(params) {
    return req("get", "CalendarEvent/Get", params);
  },
  CheckUserHasEvent(params) {
    return req("get", "CalendarEvent/CheckUserHasEvent", params);
  },
  GetEventById(params) {
    return req("get", "CalendarEvent/GetById/Id", params);
  },
  GetJoinUserByEventIds(params) {
    return req("get", "CalendarEvent/GetJoinUserByEventIds", params);
  },
  ChangeMember(params) {
    return req("get", "CalendarEvent/ReplaceJoinUser", params);
  },

  // upload
  UploadPic() {
    return req("get", "/images/Upload/Pic");
  },
  UploadFiles() {
    return req("get", "/images/Upload/Files");
  },

  // download
  DownloadExcel() {
    return req("get", "CalendarEvent/GetCalendarExcel");
  },

  //Form
  GetForm(params) {
    return req("get", "Form/Get", params);
  },
  GetFormNoPage() {
    return req("get", "Form/GetList");
  },
  GetFormById(params) {
    return req("get", "Form/GetById/Id", params);
  },
  PostForm(params) {
    return req("post", "Form/Post", params);
  },
  PutForm(params) {
    return req("put", "Form/Put", params);
  },
  DeleteForm(params) {
    return req("delete", "Form/Delete", params);
  },

  //Activity
  GetActivityById(params) {
    return req("get", "Activity/GetActivityById", params);
  },
  GetActivity(params) {
    return req("get", "Activity/GetClient", params);
  },
  PostActivity(params) {
    return req("post", "Activity/Post", params);
  },
  PutActivity(params) {
    return req("put", "Activity/Put", params);
  },
  DeleteActivity(params) {
    return req("delete", "Activity/Delete", params);
  },
  GetByMemberId(params) {
    return req("get", "ActivityRegister/GetActivityRegisterByMemberId", params);
  },

  //IndividualStatementModule
  GetIndividualStatementModuleNoPage() {
    return req("get", "IndividualStatementModule/GetList");
  },
  GetIndividualStatementModule(params) {
    return req("get", "IndividualStatementModule/Get", params);
  },
  GetIndividualStatementModuleById(params) {
    return req("get", "IndividualStatementModule/Get/Id", params);
  },
  PostIndividualStatementModule(params) {
    return req("post", "IndividualStatementModule/Post", params);
  },
  PutIndividualStatementModule(params) {
    return req("put", "IndividualStatementModule/Put", params);
  },
  DeleteIndividualStatementModule(params) {
    return req("delete", "IndividualStatementModule/Delete", params);
  },

  //CertificateTemp
  GetCertificateContentById(params) {
    return req("get", "CertificateTemp/GetCertificateTempById", params);
  },
  GetCertificateTempNoPage() {
    return req("get", "CertificateTemp/GetCertificateTempList");
  },
  GetCertificateTemp(params) {
    return req("get", "CertificateTemp/Get", params);
  },
  PostCertificateTemp(params) {
    return req("post", "CertificateTemp/Post", params);
  },
  PutCertificateTemp(params) {
    return req("put", "CertificateTemp/Put", params);
  },
  DeleteCertificateTemp(params) {
    return req("delete", "CertificateTemp/Delete", params);
  },

  //ActivityRegister
  GetRegisterData(params) {
    return req("get", "ActivityRegister/GetRegisterData", params);
  },
  PostActivityRegister(params) {
    return req("post", "ActivityRegister/Post", params);
  },
  GetActivityRegisterById(params) {
    return req("get", "ActivityRegister/GeRegisterBytActivityId", params);
  },
  DeleteActivityRegister(params) {
    return req("delete", "ActivityRegister/Delete", params);
  },
  GetActivityRegisterByUserId(params) {
    return req("get", "ActivityRegister/GetActivityRegisterById", params);
  },
  GetActivityRegisterByMemberIdExport(params) {
    return req("get", "ActivityRegister/GetActivityRegisterByMemberIdExport", params);
  },

  //ActivityRegisterDtl
  PostActivityRegisterDtl(params) {
    return req("post", "ActivityRegisterDtl/Post", params);
  },
  GetByActivityRegisterId(params) {
    return req("get", "ActivityRegisterDtl/GetByActivityRegisterId", params);
  },
  //http://enroll.wzu.edu.tw/api/ActivityRegisterDtl/GetByActivityRegisterId?ActivityRegisterId=55

  //Member
  PostForgetAccount(params) {
    return req("post", "Member/PostForgetAccount?uid="+params.uid+"&mail="+params.mail);
  },
  GetMemberById(params) {
    return req("get", "Member/GetById/Id", params);
  },
  PostMember(params) {
    return req("post", "Member/Post", params);
  },
  PutMember(params) {
    return req("put", "Member/Put", params);
  },
  PutNewPassword(params) {
    return req(
      "put",
      "Member/PutNewPassword?MemberId=" +
        params.MemberId +
        "&oldPwd=" +
        params.oldPwd +
        "&newPwd=" +
        params.newPwd
    );
  },
  PutForgetOwd(params) {
    return req(
      "put",
      "Member/PutForgetOwd?acc=" + params.acc + "&mail=" + params.mail
    );
  },
  GetByAccount(params) {
    return req("get", "Member/GetByAccount", params);
  },
  CheckMemberAccount(params) {
    return req("get", "Member/CheckMemberAccount", params);
  },
  SendRegistCode(params) {
    return req("post", "Member/SendRegistCode?TargetEmail="+params.TargetEmail);
  },
  //CertificateContent
  GetCertificateContentByActivityId(params) {
    return req("get", "CertificateContent/GetByActivityId", params);
  },
  PutCertificateContentByActivityId(params) {
    return req("put", "CertificateContent/Put", params);
  },

  //other
  UpdateBatchMeeting(params, data) {
    return req(
      "post",
      `ActivityRegister/PostBatchMeeting?uType=${params.uType}&uValue=${params.uValue}&uService=${params.uService}`,
      data
    );
  },
  QRCodeCheckIn(params) {
    return req(
      "post",
      "ActivityRegister/QRCodeCheckIn?codepass=" +
        params.codepass +
        "&hashcode=" +
        params.hashcode
    );
  },
  GetCheckData(params) {
    return req(
      "post",
      "ActivityRegister/GetCheckData?hashcode=" + params.hashcode
    );
  },
  //Banner
  GetBanner(params) {
    return req("get", "Banner/Get", params);
  },
  GetImage(params) {
    return req("post", "ActivityRegister/GetImage?actId="+params.actId+"&memId="+params.memId);
  },
  GetMasterSetById(params) {
    return req("get", "MasterSet/GetMasterSetById", params);
  },
  GetSchoolContentById(params) {
    return req("get", "SchoolContent/GetSchoolContentById", params);
  },
  OtherCheckInClient(params) {
    return req("post", "ActivityRegister/OtherCheckInClient?ActivityId="+params.ActivityId+"&account="+params.account+"&password="+params.password+"&type="+params.type);
  },
  OutpuRegisterList(params) {
    return req("get", "ActivityRegister/OutpuRegisterList",params);
  }
  //http://140.127.170.229/api/ActivityRegister/OutpuRegisterList?actId=4
};

export default api;
