<template>
  <div class="contentBox">
    <LeftMenu :name="'Member'"></LeftMenu>
    <div class="Member">
      <Breadcrumb></Breadcrumb>
      <Title :name="$router.currentRoute.meta.title" v-if="$router.currentRoute.name!='MemberParticipate'"></Title>
      <router-view/>
      <!--<GoBack v-if="$router.currentRoute.name!='login'"></GoBack>-->
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import Title from '@/components/Title.vue'
import LeftMenu from '@/components/LeftMenu.vue'
//import GoBack from '@/components/GoBack.vue'
export default {
  components:{Breadcrumb,Title,LeftMenu},
}
</script>