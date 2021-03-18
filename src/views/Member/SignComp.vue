<template>
  <div class="SignComp">
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="time" label="填寫日期"></el-table-column>
      <el-table-column prop="title" label="表單名稱"></el-table-column>
      <el-table-column prop="content" label="填寫內容"></el-table-column>
      <el-table-column label="操作">
        <template> <!--<template slot-scope="scope">-->
          <div class="TableButtonList">
            <el-button>查看</el-button>
            <el-button>修改</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list:[
        {id:1,time:"2020-07-01 12:00",title:"公版用校級會議報名表單",content:"系統管理組 || 簡ＸＸ"},
        {id:2,time:"2020-07-01 12:00",title:"公版用校級會議報名表單",content:"系統管理組 || 簡ＸＸ"},
        {id:3,time:"2020-07-01 12:00",title:"公版用校級會議報名表單",content:"系統管理組 || 簡ＸＸ"},
        {id:4,time:"2020-07-01 12:00",title:"公版用校級會議報名表單",content:"系統管理組 || 簡ＸＸ"},
        {id:5,time:"2020-07-01 12:00",title:"公版用校級會議報名表單",content:"系統管理組 || 簡ＸＸ"},
        {id:6,time:"2020-07-01 12:00",title:"公版用校級會議報名表單",content:"系統管理組 || 簡ＸＸ"},
        {id:7,time:"2020-07-01 12:00",title:"公版用校級會議報名表單",content:"系統管理組 || 簡ＸＸ"},
        {id:8,time:"2020-07-01 12:00",title:"公版用校級會議報名表單",content:"系統管理組 || 簡ＸＸ"},
        {id:9,time:"2020-07-01 12:00",title:"公版用校級會議報名表單",content:"系統管理組 || 簡ＸＸ"},
        {id:10,time:"2020-07-01 12:00",title:"公版用校級會議報名表單",content:"系統管理組 || 簡ＸＸ"},
      ]
    }
  },
  mounted() {
    if(!localStorage.wenzao_CToken) {
      this.$router.push({name:"login"})
    }
  }
}
</script>