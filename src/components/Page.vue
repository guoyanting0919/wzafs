<template>
  <div class="page">
    <template v-for="(item,index) in pList">
      <div
        class="pageD"
        :class="{'pageDonc':item==now}"
        :key="index"
        v-if="item>0&&item<=count"
        @click="goTo(item)"
      >{{item}}</div>
    </template>
    <select :value="now" @change="goTo($event.target.value)" v-if="now">
      <option v-for="(item,index) in count" :key="index" :value="item">{{item+" / "+count}}</option>
    </select>
    <div class="pageMax" v-if="max">
      <div class="pageMaxTitle">每頁筆數</div>
      <select :value="max" @change="changeMax($event.target.value)">
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
        <option value="60">60</option>
        <option value="70">70</option>
        <option value="80">80</option>
        <option value="90">90</option>
        <option value="100">100</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: ["now", "count", "rightPage", "leftPage", "max"],
  data() {
    return {};
  },
  computed: {
    pList() {
      var arr = [];
      for (
        let i = this.now - this.leftPage;
        i <= this.now + this.rightPage;
        i++
      ) {
        arr.push(i);
      }
      return arr;
    },
  },
  methods: {
    goTo(x) {
      this.$emit("changePage", x);
    },
    changeMax(x) {
      this.$emit("changeMax", x);
    },
  },
};
</script>
