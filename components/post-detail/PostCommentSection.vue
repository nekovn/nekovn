<template>
  <div class="comments__section" v-if="comment">
    <div class="comments__section--avatar">
      <nuxt-link :to="authorLink">
        <img v-bind:src="getAvatar" v-bind:alt="comment.author_data.nickname"/>
      </nuxt-link>
    </div>
    <a class="comments__section--content">
      <nuxt-link
        :to="authorLink"
        class="comments__section--user">{{ getAuthorNickName }}
      </nuxt-link>
      <p class="comments__section--time">{{ $dayjs(comment.date).fromNow() }}</p>
      <div class="comments__section--text" v-html="comment.content.rendered"></div>
      <p v-if="isParent" @click="handleShowReply" class="comments__section--reply-1">Trả lời</p>
    </a>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import {notication_error,getLoadIcon} from '@/helpers/notication';

export default {
  watchQuery:['q'],
  props: {
    comment: {
      type: Object,
      default: null
    },
    isParent: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'author/isLogin',
    }),
    authorLink() {
      return `/user/${this.comment.author}`;
    },
    getAvatar() {
      if (this.comment.author_data.avatar) {
        return this.comment.author_data.avatar;
      }
      const userId = this.comment.author;
      return `/assets/images/avatar${userId % 4 + 1}.jpg`;
    },
    getAuthorNickName() {
      if (this.comment.author_data.nickname) {
        return this.comment.author_data.nickname
      } else {
        return this.comment.author_name;
      }
    }
  },
  methods: {
    ...mapActions({
      setLoading: 'setLoading'
    }),
    handleShowReply() {
      getLoadIcon(this,1000);
      if (!this.isLogin) {
        notication_error(this, 'Vui lòng đăng nhập để trả lời bình luận !');
      }
      //kích hoạt 1 event để thay đổi data của nó
      this.$emit('replyEvent');

    }
  }
}
</script>
