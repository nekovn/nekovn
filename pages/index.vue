<template>
  <div id="home-page" class="page-wrapper home-page">
    <site-hero :title="getTitle" :subtitle="getSubTitle" :image="getImage">
      <button
        v-if="$siteConfig.newsletter.on"
        class="button is-primary show-button"
        @click="$eventBus.$emit('modal-triggered', 'newsletter-modal')"
      >
        申し込む
      </button>
    </site-hero>
    <main-section theme="one-column">
      <template v-slot:default>
        <!-- All Posts -->
        <div @click="handleUpdate">
          <posts-grid/>
        </div>
      </template>
      <template v-slot:sidebar>
        ここには何もない
      </template>
    </main-section>
    <news-letter-form-modal />
  </div>
</template>

<script>
import { mapActions , mapState } from 'vuex'
import {getLoadIcon} from '@/helpers/notication';
import NewsLetterFormModal from '~/components/NewsLetterFormModal'

export default {
  name: 'HomePage',
  head() {
    return {
      title: `ホーム | ${this.$siteConfig.siteName}`
    }
  },
  computed: {
    ...mapState({
      page: state => state.page.HomeList
    }),
    getSubTitle(){
      if(this.page && this.page.content){
        const text = this.page.content.rendered;
        return text.replace(/#|<p>|<\/p>|/g, '').trim()
      }else{
        return this.$siteConfig.tagline
      }
    },
    getTitle(){
      if(this.page && this.page.title){
        return this.page.title.rendered
      }else{
        return this.$siteConfig.siteName
      }
    },
    getImage(){
      if(this.page && this.page.featured_media_url){
        return this.page.featured_media_url
      }else{
        return this.$siteConfig.featureImage
      }
    }
  },
  methods:{
    ...mapActions({
      setLoading  : 'setLoading'
    }),
    handleUpdate(e){
      //  bật loading
      getLoadIcon(this,1000);
    }
  },
  components: {
    NewsLetterFormModal
  },
  watchQuery: true,
  async asyncData({store,req}) {
    await store.dispatch('page/actHomeMenus'),
    await store.dispatch('posts/actFetchPopularPost')
  },
}
</script>

<style>
.home-page .under-subtitle {
  border-top: none;
}
.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.animated.slower {
  -webkit-animation-duration: 3s;
  animation-duration: 3s;
}
@media screen and (max-width: 575px) {
  .show-button {
    display: none;
  }
}
</style>
