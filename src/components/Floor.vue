<template>
  <div class="Floor">
    <div class="FloorInfo" :style="{'background-color':data.topBackgroundColor,'color':data.topColor}">
      <div class="FloorInfoBox">
        <div v-html="data.topText"></div>
      </div>
    </div>
    <div class="FloorComp" :style="{'background-color':data.bottomBackgroundColor,'color':data.bottomColor}">
      <div class="FloorCompBox">
        <div v-html="data.bottomText"></div>
      </div>
    </div>
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
    this.data=await this.$api.GetMasterSetById({Id:2}).then(res=>res.data.response)
    this.data=JSON.parse(this.data.Contents)
  },
}
</script>
