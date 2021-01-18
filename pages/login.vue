<template>
  <div id="about-page" class="page-wrapper about-page content-page">
    <site-hero
      title="ログイン"
      :subtitle="getSubTitle"
      image="https://picsum.photos/1800/1802"
    ></site-hero>
    <main-section theme="sidebar-right">
      <template v-slot:default>
        <div class="tile is-parent is-10">
          <article class="tile is-child box">
            <h1 class="form-title text-center">ログイン</h1>
            <div class="form-login-register">
              <form action="">
                <div class="form-control">
                  <label>ユーザー名</label>
                  <input
                    v-model="username"
                    type="text"
                    placeholder="ユーザー名を入力してください..."
                  />
                </div>
                <div class="form-control">
                  <label>パスワード</label>
                  <i
                    v-bind:class="togglePassword"
                    v-on:click="handleShowPassword"
                  ></i>
                  <!-- <i class="toggle-password ion-eye-disabled"></i> -->
                  <input
                    v-model="password"
                    v-bind:type="typePassword"
                    placeholder="パスワードを入力してください ..."
                  />
                </div>
                <div class="d-flex tcl-jc-between tcl-ais-center" @click="handleUpdate">
                  <a-button class="login-button" type="primary" v-on:click.native="handleSubmit" html-type="submit" v-bind:loading="isLoading">
                    ログイン
                  </a-button>
                  <nuxt-link class="reset-password" to="/reset-password" >パスワードをお忘れですか?</nuxt-link>
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
import {notication_error,notication_success,getLoadIcon} from '@/helpers/notication';
export default {
  head() {
    return {
      title: `ログイン | ${this.$siteConfig.siteName}`
    }
  },
  beforeCreate() {
    antDesignVue();
  },
  //trùng với tên file middleware/notAuthenticated
  middleware: 'notAuthenticated',
  data() {
    return {
      isLoading: false,
      username: '',
      password: '',
      isShowPassword: false
    }
  },
  components: { QuoteCard },
  watchQuery: true,
  async asyncData({store,req}) {
    await Promise.all([
      store.dispatch('posts/actFetchLatestPost'),
    ])//vì 2 cái api ko liên quan nên cho nó chạy song song
  },
  computed: {
    getSubTitle(){
      return `${this.$siteConfig.siteName}と戻ったことを歓迎する`
    },
    typePassword() {
      if (this.isShowPassword) {
        return 'text';
      }
      return 'password';
    },
    togglePassword() {
      return {
        'ion-eye': !this.isShowPassword,
        'ion-eye-disabled': this.isShowPassword
      }
    }
  },
  methods: {
    ...mapActions({
      actLogin: 'author/actLogin',
      setLoading  : 'setLoading',
      actFetchCurrentUser: 'author/actFetchCurrentUser'
    }),
    handleUpdate(e){
      //  bật loading
      getLoadIcon(this,1000);
    },
    handleSubmit(e) {
      e.preventDefault(); //ngăn chặn trang web bị load lại cho chức năng submit
      this.isLoading = true;
      if (this.username && this.password) {
        if (!document.cookie) {
          this.actLogin({
            username: this.username,
            password: this.password
          })
            .then(res => {
              if (res.ok) {
                this.isLoading = false;
                notication_success(this, 'ログインしました')
                this.$router.push('/'); // router đẩy nó sang trang home
              } else {
                notication_error(this, 'ユーザー名かパスワードが無効 !');
                this.isLoading = false;
              }
            })
        } else {
          notication_success(this, 'ログインしました')
          this.$router.push('/'); // router đẩy nó sang trang home
        }
      } else {
        notication_error(this, 'アカウントを入力してください !');
        this.isLoading = false;
      }
    },
    handleShowPassword() {
      this.isShowPassword = !this.isShowPassword
    }
  },
}
</script>
<style>
@import '~/assets/css/login.css';
</style>
