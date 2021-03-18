<template>
  <div class="MemberList">
    <el-table stripe :data="list" style="width: 100%">
      <el-table-column label="序號" width="50px">
        <template template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column v-for="(item,index) in listTitle" :label="item" :prop="item" :key="index"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props:["data"],
  data() {
    return {
      list:[]
    }
  },
  async created() {
    await this.getData()
    this.$store.dispatch("loading",false)
    console.log(this.data)
  },
  computed: {
    listTitle() {
      return this.list&&this.list[0] ? Object.keys(this.list[0]) : []
    }
  },
  methods: {
    async getData() {
      this.list=await this.$api.OutpuRegisterList({actId:this.$router.currentRoute.query.Id}).then(res=>res.data)
    }
  }
}
</script>