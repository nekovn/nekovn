<template>
  <div class="card quote-card">
    <footer class="card-footer">
      <div class="card-footer-item">
        <ShareNetwork
          network="twitter"
          :url="url"
          :title="title"
          :description="description"
          :quote="quote"
          :hashtags="hashtags"
          :twitterUser="hashtags"
        >
          <a-icon type="twitter" style="font-size: 20px;"/>
          <span>Twitter共有</span>
        </ShareNetwork>
      </div>
      <div class="card-footer-item">
        <ShareNetwork
          network="facebook"
          :url="url"
          :title="title"
          :description="description"
          :quote="quote"
          :hashtags="hashtags"
        >
          <a-icon type="facebook" style="font-size: 20px;"/>
          <span>Facebook共有</span>
        </ShareNetwork>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "footer-card",
  props: {
    url: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    quote: { type: String, default: '' },
    hashtags: { type: String, default: '' },
  },
}
</script>

<style scoped>
.quote-card{
  margin-bottom: 20px;
}
</style>
