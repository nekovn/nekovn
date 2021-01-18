<template>
  <div id="contact-page" class="page-wrapper contact-page content-page">
  </div>
</template>

<script>
export default {
  name: "index",
  head() {
    return {
      title: `ユーザー | ${this.$siteConfig.siteName}`
    }
  },
  watchQuery:true,
  validate({params}) {
    if (!params.single || !params.single.trim()) { // kiểm tra xem chuỗi có tồn tại hay ko
      return false;
    }
    return true;
  },
}
</script>

<style scoped>

</style>
