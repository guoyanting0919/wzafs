<template>
  <div class="GoBack" @click="goBack">＜Back</div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>