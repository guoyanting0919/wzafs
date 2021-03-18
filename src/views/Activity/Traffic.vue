<template>
  <div class="Traffic">
    <template v-if="data.TrafficType==1">
      <div class="TrafficBox">
        <h4>交通指南</h4>
        <img src="http://ma.wzu.edu.tw/ezfiles/0/1000/img/3/107352566.jpg">
        <div>
         <br>
        高雄客運(文藻外語學院站) <br>
        於民族路校門口─8023、8025、8029、8032、8038、8039、8040、8041、8042、8046 <br>
        於鼎中路校門口─8021 <br><br>
        高雄市公車(文藻外語學院站) <br>
        於民族路校門口─72、91、民族幹線 <br>
        於鼎中路校門口─3、28、77、91、24、紅36 <br><br>
        自行開車 <br>
        自國道1號高速公路(中山高)─由鼎金系統交流道左營出口(362公里處)下高速公路行經大中路，於鼎中路口或民族路口左轉進入鼎中路或民族路(台1線)直行約1公里即達本校。 <br><br>
        自國道3號高速公路(南二高)─轉入東西向10號快速道路往西之高雄方向於民族路出口下快速道路行經大中路，於民族路口左轉進入民族一路(台1線)直行約1公里即達本校。
        </div>
        <h4>交通資訊</h4>
        <div>資訊內容</div>
        <ul>
          <li><h4>學生專車路線 Student Car</h4></li>
          <li><h4>捷運接駁車 Shuttle Bus</h4></li>
          <li><h4>相關交通指南圖 Direction to Wenzao</h4></li>
          <li>
           <h4>交通指南路線圖 Direction to Wenzao</h4>
           <div class="TrafficBoxItem">高雄市公車
             <div class="TrafficBoxItemTag">03</div>
             <div class="TrafficBoxItemTag">28</div>
             <div class="TrafficBoxItemTag">72</div>
             <div class="TrafficBoxItemTag">77</div>
             <div class="TrafficBoxItemTag">91</div>
             <div class="TrafficBoxItemTag">紅35</div>
             <div class="TrafficBoxItemTag">紅36</div>
             <div class="TrafficBoxItemTag">民族幹線</div>
           </div>
           <div class="TrafficBoxItem">高雄市客運
             <div class="TrafficBoxItemTag">8021</div>
             <div class="TrafficBoxItemTag">8023</div>
             <div class="TrafficBoxItemTag">8039</div>
             <div class="TrafficBoxItemTag">8040</div>
             <div class="TrafficBoxItemTag">8041</div>
             <div class="TrafficBoxItemTag">8042</div>
             <div class="TrafficBoxItemTag">8046</div>
           </div>
           <div class="TrafficBoxItem">義大客運
             <div class="TrafficBoxItemTag">高雄市政府線</div>
           </div>
          </li>
        </ul>
      </div>
    </template>
    <pdf :src="$store.state.fileBase+getFile.response" v-if="data.TrafficType==2"></pdf>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  props:["data"],
  components:{pdf},
  data() {
    return {
    }
  },
  computed: {
    getFile() {
      return (this.data&&JSON.parse(this.data.TrafficFile)[0]) ? JSON.parse(this.data.TrafficFile)[0] : ""
    }
  },
  async created() {
    this.$store.dispatch("loading",false)
    console.log(this.data)
  }
}
</script>

<style scoped>
img {
  width: 100%;
}
</style>>