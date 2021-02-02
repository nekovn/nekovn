<template>
  <div id="contact-page" class="page-wrapper contact-page content-page">
    <site-hero
      :title="getTitle"
      :subtitle="getSubTitle"
      image="https://picsum.photos/1800/1806"
    ></site-hero>
    <main-section theme="sidebar-right">
      <template v-slot:default>
        <div class="tile is-ancestor">
          <member-form
            :authorLink="authorLink"
            :getNickName="getNickName"
            :getDateRegistered="getDateRegistered"
            :getMoney="getMoney"
            :getTotalCm="getTotalCm"
            :getTotalView="getTotalView"
            :getTotalPost="getTotalPost"
            :getRolesAuthor="getRolesAuthor"
            :getDes="getDes"
            :getAvatar="getAvatar"
            :getVip="getVip"
            :getFacebookLink="getFacebookLink"
          />
          <div class="tile is-parent is-8">
            <article class="tile is-child box">
              <div class="related-post" @click="handleUpdate">
                <h2 class="related-post__head">{{ getNickName }}の記事</h2>
                <div v-if="articles.length === 0 "><h3>{{ $siteConfig.noPost }}</h3></div>
                <PostRelatedCard
                  v-for="(item,index) in articles"
                  v-bind:key="index"
                  v-bind:post="item"
                />
              </div>
              <div class="spacing"></div>
              <div class="text-center">
                <a-button
                  type="primary"
                  v-if="hasMoreArticles"
                  @click.prevent="handleLoadMore"
                  html-type="submit"
                  v-bind:loading="isLoading">
                  もっと読み込む
                </a-button>
              </div>
            </article>
          </div>
        </div>
      </template>
      <template v-slot:sidebar>
        <div @click="handleUpdate">
          <h3 class="subtitle is-4">
            他の記事
          </h3>
          <!--           Other Posts -->
          <posts-grid :per-row="1" :number="2"/>
        </div>
      </template>
    </main-section>
  </div>
</template>
<script>
import {mapActions, mapState , mapGetters} from 'vuex'
import {getFormattedDate} from '@/helpers'
import antDesignVue from '@/plugins/ant-design-vue';
import {getLoadIcon} from '@/helpers/notication';

export default {
  name: "index",
  head() {
    return {
      title: `ユーザー | ${this.$siteConfig.siteName}`
    }
  },
  beforeCreate() {
    antDesignVue();
  },
  data() {
    return {
      image: '/uploads/admin.jpg',
      author_id: this.$route.params.single,
      isLoading: false,
    }
  },
  fetchOnServer: false,
  async fetch ({store, params, error}) {
    const user_id = (Number(params.single)) ?  Number(params.single) : 1 ;
    const res = await store.dispatch('posts/actFetchUserInf', {user_id});
    if (!res.ok) {
      return error({statusCode: 402, message: 'Post not found'})
    } else {
      await Promise.all([
        store.dispatch('posts/actFetchLatestPost'),
        store.dispatch('posts/actFetchArticlesByAuthor', {
          author: user_id,
        }),
        store.dispatch('posts/actFetchArticlesOtherByUser', {
          author: user_id,
        }),
      ])
    }

  },
  methods: {
    ...mapActions({
      actFetchArticlesByAuthor: 'posts/actFetchArticlesByAuthor',
      setLoading: 'setLoading'
    }),
    handleUpdate(e) {
      //  bật loading
      getLoadIcon(this, 2000);
    },
    handleLoadMore(e) {
      if (this.isLoading || !this.hasMoreArticles) {
        return true;
      }
      this.isLoading = true;
      this.actFetchArticlesByAuthor({
        curPage: this.curPage + 1,
        author: this.author_id,
      })
        .then(() => {
          this.isLoading = false; // tat di vong tron loading
        })
    }
  },
  computed: {
    ...mapGetters({
      userInf:'posts/getUserInf',
      wpTotalPages:'posts/getWpTotalPages',
      curPage:'posts/getCurrentPage',
      articles:'posts/getArticles',
    }),
    hasMoreArticles() {
      return this.curPage < this.wpTotalPages
    },
    authorLink(){
      return `/user/${this.author_id}`
    },
    getNickName() {
      if (this.userInf && this.userInf.user_nicename) {
        return this.userInf.user_nicename
      } else {
        return this.$siteConfig.userEmpty
      }
    },
    getFacebookLink() {
      if (this.userInf && this.userInf.facebook_link) {
        return this.userInf.facebook_link
      } else {
        return ''
      }
    },
    getDateRegistered() {
      if (this.userInf && this.userInf.user_registered) {
        return getFormattedDate(this.userInf.user_registered);
      } else {
        return '2020/12/20';
      }
    },
    getMoney() {
      if (this.userInf && this.userInf.money) {
        return this.userInf.money;
      } else {
        return 0
      }
    },
    getTotalCm() {
      if (this.userInf && this.userInf.total_comments) {
        return this.userInf.total_comments;
      } else {
        return 0
      }
    },
    getTotalView() {
      if (this.userInf && this.userInf.view) {
        return this.userInf.view;
      } else {
        return 0
      }
    },
    getVip() {
      if (this.userInf && this.userInf.vip) {
        return this.userInf.vip;
      } else {
        return 0
      }
    },
    getTotalPost() {
      if (this.userInf && this.userInf.total_posts) {
        return this.userInf.total_posts;
      } else {
        return 0
      }
    },
    getRolesAuthor() {
      if (this.userInf && this.userInf.roles) {
        const str = this.userInf.roles;
        return str.charAt(0).toUpperCase() + str.slice(1);
      } else {
        return this.$siteConfig.userEmpty
      }
    },
    getDes() {
      if (this.userInf && this.userInf.description) {
        return this.userInf.description
      } else {
        return this.$siteConfig.userEmpty
      }
    },
    getAvatar() {
      if (this.userInf && this.userInf.avatar) {
        return {src: this.userInf.avatar, srcSet: this.userInf.avatar}
      }
      return {
        src: `/assets/images/avatar${this.author_id % 4 + 1}.jpg`,
        srcSet: `/assets/images/avatar${this.author_id % 4 + 1}.jpg`
      }
    },
    getTitle() {
      return `プロフィール ${this.getNickName}`
    },
    getSubTitle() {
      return `${this.getNickName}の記事がおもしろいと思ったらコメントするか共有してください`
    },
  }
}
</script>
<style>

</style>
