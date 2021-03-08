<template>
  <div id="post-page" class="page-wrapper post-page">
    <site-hero :title="getTitle" :subtitle="getSubTitle" :image="getImage">
      <span
        @click="handleUpdate"
        v-if="getAuthor && $siteConfig.posts.displayAuthor"
        class="author-wrapper"
      >
        <strong>Tác giả: </strong><nuxt-link :to="authorLink">{{ getAuthor }}</nuxt-link>
      </span>
      <span v-if="date" class="date-wrapper">
        <strong>Ngày đăng:</strong> {{ date }}
      </span>
    </site-hero>
    <main-section :one-column-constrained="true">
      <template v-slot:default>
        <div class="post-wrapper">
          <markdown :markdown="getContent" />
          <footer-card :url="getLink" :title="getTitle" :description="getDes" :quote="getTitle" :hashtags="$siteConfig.siteName"/>
          <div class="other-posts" @click="handleUpdate">
            <h6 class="subtitle is-size-4">
              Bài viết liên quan
            </h6>
            <!-- Related Posts -->
            <posts-grid v-if="post"/>
          </div>
          <disqus-comments />
        </div>
      </template>
      <template v-slot:sidebar>
        <post-sidebar />
      </template>
    </main-section>
  </div>
</template>
<script>
import  {mapActions , mapGetters} from 'vuex'
import  { getFormattedDate } from '../helpers'
import  {getLoadIcon} from '@/helpers/notication';
import Markdown from '~/components/Markdown'
import FooterCard from '~/components/FooterCard'

import PostSidebar from '~/components/PostSidebar'
export default {
  components: {
    Markdown,
    PostSidebar,
    FooterCard
  },
  head() {
    return {
      title: `${this.post.title.rendered} | ${this.$siteConfig.siteName}`,
    }
  },
  data(){
    return {
      idTimeOut : null,
      author:'',
    }
  },
  fetchOnServer: false,
  async fetch({params, store,error}) {
    const slug = (params.singlePost) ? params.singlePost : '' ;
    const res = await store.dispatch('posts/actFetchArticleBySlug', {slug})
    if (res.ok) {
      const title        = (res.post.title.rendered) ? res.post.title.rendered:'';
      const content      = (res.post.content.rendered) ? res.post.content.rendered:''
      const seoTitle     = (res.post._yoast_wpseo_title) ? res.post._yoast_wpseo_title:title;
      const seoDes       = (res.post._yoast_wpseo_metadesc) ? res.post._yoast_wpseo_metadesc:content;


      const contentRep   = seoDes.toLowerCase()
        .replace(/#|_|-|<h2|<\/h2|<h3|<\/h3|<h1|<\/h1|~|>|<p|<\/p|<strong|<\/strong|\n|\r|\*|!|\+|`|\||\[|\]|_|:/g, '');
      const subtitle     = contentRep.length > 500 ? contentRep.substring(0,499): contentRep;
      const url          = (res.post.slug) ? (process.env.URL ? process.env.URL :'')+res.post.slug:'';
      const featureImage = (res.post.featured_media_url) ? res.post.featured_media_url:'';
      const postDetail   = res.post;
      const post         = postDetail.id;
      const data         = {
        title: seoTitle,
        subtitle: subtitle,
        url:url,
        featureImage:featureImage
      };
      await Promise.all([
        store.dispatch('set', {data}),
        store.dispatch('comment/actFetchCommentList', {post}),
        store.dispatch('posts/actFetchRelatedPostsByCategory', {post}),
      ]);
    }else{
      return error({ statusCode: 402, message: 'Post not found' })
    }

  },
  computed: {
    ...mapGetters({
      post:'posts/getPostDetail'
    }),
    date() {
      if(this.post.date){
        return getFormattedDate(this.post.date)
      }else{
        return getFormattedDate('2020-08-08T07:10:40')
      }

    },
    authorLink() {
      if(this.post && this.post.author){
        return `/user/${this.post.author}`;
      }else{
        return `/user/1`;
      }
    },
    getComment(){
      if(this.post && this.post.comment_count){
        return this.post.comment_count
      }
    },
    getAuthor(){
      if(this.post.author_data && this.post.author_data.nickname){
          return this.post.author_data.nickname;
      }else{
        return this.$siteConfig.author
      }
    },
    getTitle(){
      if(this.post && this.post._yoast_wpseo_title){
        return  this.post._yoast_wpseo_title;
      }else if(this.post && this.post.title.rendered){
        return  this.post.title.rendered;
      }
      return this.$siteConfig.siteName
    },
    getDes(){
      if(this.post && this.post._yoast_wpseo_metadesc){
        return  this.post._yoast_wpseo_metadesc;
      }else if(this.post && this.post.content.rendered){
        const contentRep   = this.post.content.rendered.toLowerCase()
          .replace(/#|_|-|<h2|<\/h2|<h3|<\/h3|<h1|<\/h1|~|>|<p|<\/p|<strong|<\/strong|\n|\r|\*|!|\+|`|\||\[|\]|_|:/g, '');
        return  contentRep.length > 300 ? contentRep.substring(0,299): contentRep;
      }
        return this.$siteConfig.userEmpty;
    },
    getSubTitle(){
      if(this.post){
        let view_count    = (this.post.view_count)?this.post.view_count:0
        let comment_count = (this.post.comment_count)?this.post.comment_count:0
        return `ビュー数 : ${view_count} 回  || コメント数 : ${comment_count} 回`;
      }else{
        return this.$siteConfig.contentSample;
      }
    },
    getImage(){
      if(this.post.featured_media_url){
        return this.post.featured_media_url;
      }else{
        return this.$siteConfig.featureImage;
      }
    },
    getLink(){
      if(this.post.slug){
        return (process.env.URL ? process.env.URL :this.$siteConfig.url)+this.post.slug;
      }else{
        return this.$siteConfig.url;
      }
    },
    getContent(){
      if(this.post.content.rendered){
        return this.post.content.rendered
      }else{
        return this.$siteConfig.userEmpty;
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
  mounted() {
    //khi ng dùng vào trang lần đầu tiên thì goi api count view tăng số lượt view lên
    //lưu lượt count view vào cookie pvc_visits[0]
    this.idTimeOut =  setTimeout(()=>{
      if(this.post){
        this.$wpApi.post('/post-views-counter/view-post',{
          id:this.post.id
        })
      }
    },10000)//sau 10s thì tăng 1 lượt xem
  },
  destroyed() {
    //  khi ng dùng thoát trang
    if(this.idTimeOut){
      clearTimeout(this.idTimeOut);
    }
  },

}
</script>
<style scoped lang="scss">
.edit-post {
  margin-bottom: 20px;
}
</style>
