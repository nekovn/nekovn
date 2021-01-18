<template>
  <resource-grid
    :resource="CheckTypeName"
    :id = "id"
    v-bind="$props"
    :theme="$siteConfig.posts.theme || $siteConfig.cards.theme || null"
  >
    <template v-slot:default="{ item }">
      <post-card
        :title="item.title"
        :link="item.slug ? `/${item.slug}` : ''"
        :image="item.featured_media_url? item.featured_media_url : '' "
        :author="item.author_data"
        :date="item.date"
      />
    </template>
  </resource-grid>
</template>
<script>
import PostCard from '~/components/cards/PostCard'
import {mapState} from "vuex"
export default {
  name: 'PostsGrid',
  watchQuery: true,
  props: {
    perRow: { type: Number, default: 3 },
    category: {
      type: Array,
      default() {
        return []
      }
    },
    id: { type: Object, default: null },
  },
  components: { PostCard },
  data(){
    return {
      params:this.$route.name
    }
  },
  computed:{
    ...mapState({
        post:state => state.posts.postDetail,
        postView:state => state.posts.popularList,
        postLatest:state => state.posts.latestList,
        postOther:state => state.posts.otherPosts,
        relatedPostByCategory:state => state.posts.latestListByCategory,

      }),
    CheckTypeName(){
      if(this.params && this.params ==='contact'){
        return this.postLatest;
      }
      if(this.params && this.params ==='about') {
        return this.postLatest;
      }
      if(this.params && this.params ==='login') {
        return this.postLatest;
      }
      if(this.params && this.params ==='register') {
        return this.postLatest;
      }
      if(this.params && this.params ==='reset-password') {
        return this.postLatest;
      }
      if(this.params && this.params ==='set-password') {
        return this.postLatest;
      }
      if(this.params && this.params ==='index'){
        return this.postView;
      }
      if(this.params && this.params === 'singlePost' ){
        return this.relatedPostByCategory;
      }
      if(this.params && this.params === 'user-single' ){
        return this.postOther;
      }
      if(this.params && this.params === 'categories-single' && this.category){
        return  this.category;
      }
    },

  },


}
</script>
