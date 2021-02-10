<template>
  <footer class="site-footer">
    <a-row>
      <a-col :span="6" :offset="2">
        <introduce/>
      </a-col>
      <a-col :span="6" :offset="2">
        <site-nav-footer/>
      </a-col>
      <a-col :span="8">
        <connect-footer/>
      </a-col>
    </a-row>
    <div style="text-align: center;">
      {{ $siteConfig.siteName }} &copy; {{ new Date().getFullYear() }} -
      Inc. All Rights Reserved. 無断転載禁止
    </div>

  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
}
</script>

<style scoped>
footer {
  background: #eee;
  padding: 20px 10px;
  transition: 0.5s ease all;
}
footer p {
  display: block;
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  line-height: 2;
  font-weight: 200;
  color: #878787;
  -webkit-font-smoothing: antialiased;
  -webkit-text-shadow: rgba(0, 0, 0, .01) 0 0 1px;
  text-shadow: rgba(0, 0, 0, .01) 0 0 1px;
}
</style>
