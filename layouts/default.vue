<template>
  <div
    :class="
      `site-layout-width-${$siteConfig.layout.width} posts-theme-${$siteConfig.posts.theme}`
    "
  >
    <div :class="{show:this.isLoading,loading:true}">
      <AppLoadingSvg/>
    </div>
    <site-nav/>
    <nuxt/>
    <news-letter-slide-out v-if="$siteConfig.newsletter.on"/>
    <site-footer></site-footer>
  </div>
</template>
<script>
import 'animate.css/animate.min.css';
import {mapActions, mapState} from "vuex";
import AppLoadingSvg from "../components/AppLoadingSvg";

export default {
  components: {AppLoadingSvg},
  transition: 'slide-fade',
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  head() {
    return {
      title: `${this.$store.state.title} | ${this.$siteConfig.siteName}`,
      meta: [
        {hid: 'description', name: 'description', content: this.$siteConfig.tagline},
        {hid: 'og:description', property: 'og:description', content: this.$siteConfig.tagline},
        {hid: 'og:title', property: 'og:title', content: this.$siteConfig.siteName},
        {hid: 'og:url', property: 'og:url', content: this.$siteConfig.url},
        {hid: 'og:site_name', property: 'og:site_name', content: this.$siteConfig.siteName},
        {
          hid: 'og:image',
          property: 'og:image',
          content: (process.env.URL ? process.env.URL : '') +
          require(`~/assets${this.$siteConfig.featureImage}`) || 'https://picsum.photos/1800/1807'
        },
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:site', content: '@Twitter'}
      ],
    }
  },
  methods: {
    ...mapActions({
      actResetCurrentUser: 'author/actResetCurrentUser',
    }),
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      token    : state => state.author.token
    })
  },
  mounted() {
    setInterval(() => {
      if (!document.cookie) {
        this.actResetCurrentUser();
      }
    }, 3000)
  }
}
</script>
<style>
.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  background-color: rgba(0, 255, 255, 0.13);
}

.show {
  opacity: 1;
  visibility: visible;
}

.loading svg {
  width: 100px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.4);
}
</style>
