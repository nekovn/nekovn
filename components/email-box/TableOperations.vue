<template>
  <div>
    <a-button>
      <a-icon type="file-protect"/>
      <a-badge :count="getCountArticle" :number-style="{ backgroundColor: '#52c41a' }"/>
    </a-button>
    <a-button @click="handleAdd">
      Thêm mới
    </a-button>
    <a-button @click="handleSupport" v-if="type=='support'">
      Trợ giúp
    </a-button>
  </div>
</template>

<script>
export default {
  name: "TableOperations",
  props: {
    getCountArticle: {type: Number, default: 0},
    type:{type:String,default:''}
  },
  methods: {
    handleAdd() {
      return this.$router.push('/dashboard/article');
    },
    handleSupport() {
      this.$notification.open({
        message: 'こんにちは',
        description:
          '話し合いたい問題がある場合は、メールでお問い合わせください',
        icon: <a-icon type="smile" style="color: #108ee9" />,
    });
      return this.$router.push('/contact');
    },
  }
}
</script>

<style scoped>

</style>
