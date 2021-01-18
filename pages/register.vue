<template>
  <div id="about-page" class="page-wrapper about-page content-page">
    <site-hero
      title="登録"
      :subtitle="getSubTitle"
      image="https://picsum.photos/1800/1803"
    ></site-hero>
    <main-section theme="sidebar-right">
      <template v-slot:default>
        <div class="tile is-parent is-10">
          <article class="tile is-child box">
            <h1 class="form-title text-center">登録</h1>
            <div class="form-login-register">
              <form action="">
                <div class="form-control">
                  <label for="">ユーザー名</label>
                  <input
                    v-model="username"
                    type="text"
                    placeholder="ユーザー名を入力してください..."
                  />
                </div>
                <div class="form-control">
                  <label for="">メールアドレス</label>
                  <input
                    v-model="email"
                    type="text"
                    placeholder="メールアドレスを入力してください...."
                  />
                </div>
                <div class="form-control">
                  <label for="">パスワード</label>
                  <i
                    v-bind:class="togglePassword"
                    v-on:click="handleShowPassword"
                  ></i>
                  <input
                    v-model="password"
                    v-bind:type="typePassword"
                    placeholder="パスワードを入力してください ..."
                  />
                </div>
                <div class="form-control">
                  <label for="">パスワード（確認）</label>
                  <i
                    v-bind:class="togglePassword"
                    v-on:click="handleShowPassword"
                  ></i>
                  <input
                    v-model="confirm_password"
                    v-bind:type="typePassword"
                    placeholder="パスワード（確認）を入力してください ..."
                  />
                </div>
                <div class="d-flex tcl-jc-between tcl-ais-center" @click="handleUpdate">
                  <a-button type="primary" v-on:click.native="handleSubmit" html-type="submit" v-bind:loading="isLoading">
                    登録
                  </a-button>
                  <nuxt-link class="reset-password" to="/login">すでにアカウントをお持ちですか?</nuxt-link>
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
import {_switch} from '@/helpers/notication';
export default {
  head() {
    return {
      title: `登録 | ${this.$siteConfig.siteName}`
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
      confirm_password: '',
      email: '',
      isShowPassword: false
    }
  },
  computed: {
    getSubTitle(){
      return `アカウントを登録して、${this.$siteConfig.siteName}から詳細情報を受け取ります`
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
      actRegister: 'author/actRegister',
      setLoading  : 'setLoading'
    }),
    handleUpdate(e){
      //  bật loading
      getLoadIcon(this,1000);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.isLoading = true;
      if (this.password !== this.confirm_password) {
        notication_error(this,'パスワード（確認）が一致しません !');
        this.isLoading = false;
        return;
      }
      this.actRegister({
        username : this.username,
        email    : this.email,
        password : this.password,
        nickname : this.username
      })
        .then(res => {
          if (res.ok) {
            this.isLoading = false;
            notication_success (this,'アカウント登録が成功しました')
            this.$router.push('/');
          } else {
            _switch(this,res.error)
            this.isLoading = false;
          }
        })
    },
    handleShowPassword() {
      this.isShowPassword = !this.isShowPassword
    }
  },
  components: { QuoteCard },
  watchQuery: true,
  async asyncData({store,req}) {
    await Promise.all([
      store.dispatch('posts/actFetchLatestPost'),
    ])//vì 2 cái api ko liên quan nên cho nó chạy song song
  },

}
</script>
<style>
@import '~/assets/css/login.css';
</style>
