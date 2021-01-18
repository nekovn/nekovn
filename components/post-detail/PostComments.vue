<template>
  <div class="post-detail__comments">
  <PostCommentsForm
    v-if="isLogin"
    v-on:postCommentEvent="handlePostParentComment"

  />
    <div v-else  @click="handleUpdate">
      <p>新しいコメントを投稿するには<nuxt-link to="/login">ログイン</nuxt-link>してください</p>
    </div>
    <p>{{ getComment }} コメント</p>
    <ul class="comments">
      <!-- Comment 1 -->
      <PostCommentItem
        v-for="item in comments"
        v-bind:key="item.id"
        v-bind:comment="item"
      />

    </ul>

    <div class="text-center">
      <a-button
        type="primary"
        v-if="hasMoreComments"
        v-on:click.native="handleLoadMore"
        html-type="submit"
        v-bind:loading="isLoading">
        もっと読み込む
      </a-button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState,mapGetters} from 'vuex';
import PostCommentsForm from "@/components/post-detail/PostCommentsForm";
import antDesignVue from '@/plugins/ant-design-vue';
import {_switch_comment,notication_success,getLoadIcon} from '@/helpers/notication';

export default {
  components: {PostCommentsForm},
  beforeCreate() {
    antDesignVue();
  },
  data() {
    return {
      isLoading: false,
      commentsExclude:[]
    }
  },
  computed: {
    ...mapGetters({
      isLogin:'author/isLogin'
    }),
    ...mapState({
      wpTotal: state => state.comment.commentsPaging.wpTotal,
      wpTotalPages: state => state.comment.commentsPaging.wpTotalPages,
      curPage: state => state.comment.commentsPaging.curPage,
      comments: state => state.comment.commentsPaging.comments,
      post: state => state.posts.postDetail,
    }),
    hasMoreComments() {
      return this.curPage < this.wpTotalPages
    },
    getComment(){
      if(this.post && this.post.comment_count){
        return this.post.comment_count
      }else{
        return 0
      }
    },
  },
  methods: {
    ...mapActions({
      actFetchCommentList: 'comment/actFetchCommentList',
      actPostNewComment:'comment/actPostNewComment',
      setLoading  : 'setLoading'
    }),
    handleUpdate(e){
      //  bật loading
      getLoadIcon(this,1000);
    },
    handleLoadMore(e) {
      if (this.isLoading || !this.hasMoreComments) { // neu = false thi chay luon ko chay api
        return true;
      }
      this.isLoading = true; // truoc khi goi api cho loading bang true cho no chay vong tron

      this.actFetchCommentList({
        curPage: this.curPage + 1,
        post: this.post.id,
        exclude:this.commentsExclude
      })
        .then(() => {
          this.isLoading = false; // tat di vong tron loading
        })
    },
    handlePostParentComment({content,callback}){
      callback();//sau khi dang binh luan xong thi reset lại comment rỗng va tắt loading
     this.actPostNewComment({
       content,
       post:this.post.id
     })
      .then(res =>{
        if(res.ok){
          notication_success (this,'Bình luận thành công')
          this.commentsExclude.push(res.comment.id);
        }else {
          _switch_comment(this,res.error)
        }
      })
    }
  }

}
</script>

<style>
@import '~/assets/css/comments.css';
.text-center {
  text-align: center;
}
</style>
