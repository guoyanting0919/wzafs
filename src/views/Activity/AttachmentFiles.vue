<template>
  <div class="AttachmentFiles">
    <div class="info" v-if="fileList.length>0">
      <div class="infoItem" v-for="(item,index) in fileList" :key="index">
        <i class="el-icon-document"></i>
        <a :href="$store.state.fileBase+'Files/'+item.path[0].response" target="_blank">{{filterName(item.path[0].response)}}</a>
      </div>
    </div>
    <div class="info" v-else>此活動無相關檔案可下載!</div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  computed: {
    fileList() {
      return this.data && JSON.parse(this.data.AttachmentFiles)
        ? JSON.parse(this.data.AttachmentFiles)
        : false;
    },
    filterName() {
      return (links) => links.substr(6);
    },
  },
  created() {
    console.log(this.fileList);
    this.$store.dispatch("loading", false);
  },
};
</script>