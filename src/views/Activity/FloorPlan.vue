<template>
  <div v-html="data.Contents">
  </div>
</template>

<script>
export default {
  data() {
    return {
      data:{}
    }
  },
  async created() {
    this.data=await this.$api.GetSchoolContentById({Id:1}).then(res=>res.data.response)
    this.$store.dispatch("loading",false)
  }
}
</script>

<style scoped>
img {
  width: 100%;
}
</style>>