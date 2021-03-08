<template>
  <div id="about-page" class="page-wrapper about-page content-page">
    <site-hero
      title="Về NekoVn"
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
            Bài viết mới nhất
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
import { mapActions, mapGetters} from "vuex";

export default {
  head() {
    return {
      title: `Về NekoVn | ${this.$siteConfig.siteName}`,
    }
  },
  components: {QuoteCard},
  fetchOnServer: false,
  async fetch({store}) {
    const id =  await store.dispatch('page/actAboutMenus');
    await Promise.all([
        store.dispatch('page/actGetPageAbout', id),
        store.dispatch('posts/actFetchLatestPost')
      ]
    )

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
  computed: {
    ...mapGetters({
      page:'page/getAboutList'
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
        return 'ĐIỀU KHOẢN SỬ DỤNG WEBSITE.VUI LÒNG ĐỌC KỸ CHÚNG'
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
