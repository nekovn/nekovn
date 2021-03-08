<template>
  <div class="comments__form" v-if="currentUser">
    <div class="comments__form--control">
      <div class="comments__section--avatar">
        <nuxt-link v-bind:to="authorLink">
          <img v-bind:src="avatar" v-bind:alt="currentUser.name">
        </nuxt-link>
      </div>
      <textarea v-bind:placeholder="placeholder" v-model="content"></textarea>
    </div>
    <div class="text-right">
      <a-button type="primary" v-on:click.native="handleSubmitComment" html-type="submit">
        Đăng bình luận
      </a-button>
    </div>
  </div>
</template>
<script>
import {mapState,mapGetters,mapActions} from 'vuex';
import {notication_error,getLoadIcon} from '@/helpers/notication';
export default {
  name: "PostCommentsForm",
  data(){
    return {
      content:''
    }
  },
  computed: {
    ...mapGetters({
      avatar: 'author/avatar'
    }),
    ...mapState({
      currentUser : state => state.author.currentUser
    }),
    authorLink(){
      return `/user/${this.currentUser.id}`;
    },
  },
  props:{
    placeholder:{
      type:String,
      default:'nhập bình luận cho bài viết ...'
    }
  },
  methods:{
    ...mapActions({
      setLoading: 'setLoading'
    }),

    handleSubmitComment(){
      getLoadIcon(this,1000);
      if(!this.content){
        notication_error(this, 'Vui lòng nhập bình luận !');
        return false
      }
      const data = {
        content:this.content,
        callback: () => {
          this.content='';
        }
      }
      this.$emit('postCommentEvent',data)

    }
  }
}
</script>

<style scoped>
.text-right {
  text-align: right;
}
</style>
