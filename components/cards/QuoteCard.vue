<template>
  <div class="card quote-card">
    <div class="card-content" v-html="content">
    </div>
    <footer-card :url="$siteConfig.url" :title="$siteConfig.tagline" :description="$siteConfig.contentSample" :quote="$siteConfig.contentSample" :hashtags="$siteConfig.siteName"/>
  </div>
</template>
<script>
export default {
  props:{
    content:{type:String,default:''},
  }
}
</script>
