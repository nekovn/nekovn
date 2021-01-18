<template>
  <div>
    <h3>{{getTitle}}</h3>
    <nuxt-link to="/">
      <img :src="getImage" :alt="getTitle" style="width: 359px;height: 118px;margin-bottom: 10px">
    </nuxt-link>
    <div v-html="getContent">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "introduce",
  computed: {
    ...mapState({
      page: state => state.page.IntroList
    }),
    getContent(){
      if(this.page && this.page.content){
        return this.page.content.rendered;
      }else{
        return this.$siteConfig.contentSample
      }
    },
    getTitle(){
      if(this.page && this.page.title){
        return this.page.title.rendered
      }else{
        return this.$siteConfig.introduce
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

<style scoped>

</style>
