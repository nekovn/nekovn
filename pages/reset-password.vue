<template>
  <div id="about-page" class="page-wrapper about-page content-page">
    <site-hero
      title="パスワード再設定"
      :subtitle="getSubTitle"
      image="https://picsum.photos/1800/1804"
    ></site-hero>
    <main-section theme="sidebar-right">
      <template v-slot:default>
        <div class="tile is-parent is-10">
          <article class="tile is-child box">
            <h1 class="form-title text-center">パスワード再設定</h1>
            <div class="form-login-register">
              <form action="">
                <div class="form-control">
                  <label>メールアドレス</label>
                  <input
                    v-model="email"
                    type="text"
                    placeholder="メールアドレスを入力してください ..."
                  />
                </div>
                <div class="d-flex tcl-jc-between tcl-ais-center" @click="handleUpdate">
                  <a-button type="primary" v-on:click.native="handleSubmit" html-type="submit" v-bind:loading="isLoading">
                    送信
                  </a-button>
                  <nuxt-link class="reset-password" to="/login">ログイン</nuxt-link>
                </div>
              </form>
            </div>
          </article>
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
import {mapActions} from 'vuex';
import antDesignVue from '@/plugins/ant-design-vue';
import {notication_error,getLoadIcon} from '@/helpers/notication';
export default {
  head() {
    return {
      title: `再設定パスワード | ${this.$siteConfig.siteName}`
    }
  },
  beforeCreate() {
    antDesignVue();
  },
  middleware: 'notAuthenticated',
  data() {
    return {
      isLoading: false,
      email: '',
    }
  },
  components: { QuoteCard },
  async asyncData({store}) {
    await store.dispatch('posts/actFetchLatestPost')
  },
  computed: {
    getSubTitle(){
      return `ユーザーID / パスワードの確認や再設定をしたい個人会員`
    },

  },
  methods: {
    ...mapActions({
      setLoading  : 'setLoading',
      actResetPassword: 'author/actResetPassword'
    }),
    handleUpdate(e){
      //  bật loading
      getLoadIcon(this,1000);
    },
    handleSubmit(e) {
      this.isLoading = true;
      e.preventDefault();
      if (this.email) {
        this.actResetPassword({
          email: this.email,
        })
          .then(res => {
            if (res.ok) {
              this.isLoading = false;
              this.$notification.success({
                message: 'メールに1つのコードを送信しました',
                description: 'コードを受け取っていない場合は、ご連絡ください',
              });
              this.$router.push({
                  path: '/set-password',
                query: {
                  q: this.email
                }
              })
            } else {
              this.email = '';
              notication_error(this, 'メールが登録されていません。登録したメールを正しく入力してください！');
              this.isLoading = false;
            }
          })
      }else{
        notication_error(this, '登録メールを入力してください！');
        this.isLoading = false;
      }
    },
  }
}
</script>
<style>
@import '~/assets/css/login.css';
</style>
