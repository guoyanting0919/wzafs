<template>
  <div class="Breadcrumb">
    <router-link class="BreadcrumbItem" v-for="(item,index) in nowPath.matched" :key="index" :to="{name:item.name}">{{item.meta.title}}<div class="BreadcrumbItemSeparate" v-if="index!=nowPath.matched.length-1">/</div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowPath: this.$router.currentRoute,
    };
  },
  watch: {
    $route() {
      this.nowPath = this.$router.currentRoute;
    },
  },
  mounted() {
    // console.log(this.nowPath)
  },
};
</script>
