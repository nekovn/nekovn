<template>
  <div id="about-page" class="page-wrapper about-page content-page">
    <site-hero
      title="免責事項"
      :subtitle="getSubTitle"
      :image="getImage"
    ></site-hero>
    <main-section theme="sidebar-right">
      <template v-slot:default>
        <div class="tile is-ancestor">
          <quote-card :content="getContent"/>
        </div>
      </template>

      <template v-slot:sidebar>
        <div  @click="handleUpdate">
          <h3 class="subtitle is-4">
            速報・新着
          </h3>
          <!-- Latest Posts -->
          <posts-grid :per-row="1" :number="2"/>
        </div>
      </template>
    </main-section>
  </div>
</template>
<script>
import QuoteCard from '~/components/cards/QuoteCard'
import {getLoadIcon} from '@/helpers/notication';
import {mapState,mapActions} from "vuex";

export default {
  head() {
    return {
      title: `免責事項 | ${this.$siteConfig.siteName}`,
    }
  },
  components: {QuoteCard},
  watchQuery: true,
  async asyncData({store}) {
    await Promise.all([
      store.dispatch('posts/actFetchLatestPost'),
      store.dispatch('page/actAboutMenus')
      ])},
  methods:{
    ...mapActions({
      setLoading  : 'setLoading'
    }),
    handleUpdate(e){
      //  bật loading
      getLoadIcon(this,1000);
    }
  },
  computed: {
    ...mapState({
      page: state => state.page.AboutList
    }),
    getContent(){
      if(this.page && this.page.content){
          return this.page.content.rendered
      }else{
          return this.$siteConfig.about
      }
    },
    getSubTitle(){
      if(this.page && this.page.title){
        return this.page.title.rendered
      }else{
        return '利用者は注意点をお読みいただき、ご了解いただいた上でご利用ください'
      }
    },
    getImage(){
      if(this.page && this.page.featured_media_url){
        return this.page.featured_media_url
      }else{
        return this.$siteConfig.image
      }
    }
  }
}
</script>
