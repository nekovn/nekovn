<template>
  <div id="about-page" class="page-wrapper about-page content-page">
    <site-hero
      title="Đăng nhập"
      :subtitle="getSubTitle"
      image="https://picsum.photos/1800/1802"
    ></site-hero>
    <main-section theme="sidebar-right">
      <template v-slot:default>
        <div class="tile is-parent is-10">
          <article class="tile is-child box">
            <h1 class="form-title text-center">Đăng nhập</h1>
            <div class="form-login-register">
              <form action="">
                <div class="form-control">
                  <label>Tên đăng nhập</label>
                  <input
                    v-model="username"
                    type="text"
                    name="username"
                    placeholder="Vui lòng nhập tên đăng nhập..."
                  />
                </div>
                <div class="form-control">
                  <label>Mật khẩu</label>
                  <a-icon type="eye" v-on:click="handleShowPassword" v-if="!isShowPassword"/>
                  <a-icon type="eye-invisible" v-on:click="handleShowPassword" v-else/>
                  <!-- <i class="toggle-password ion-eye-disabled"></i> -->
                  <input
                    v-model="password"
                    v-bind:type="typePassword"
                    name="password"
                    placeholder="Vui lòng nhập mật khẩu ..."
                  />
                </div>
                <div class="d-flex tcl-jc-between tcl-ais-center" @click="handleUpdate">
                  <a-button class="login-button" type="primary" v-on:click.native="handleSubmit" html-type="submit" v-bind:loading="isLoading">
                    Đăng nhập
                  </a-button>
                  <nuxt-link class="reset-password" to="/reset-password" >Quên mật khẩu?</nuxt-link>
                </div>
              </form>
            </div>
          </article>
        </div>
      </template>

      <template v-slot:sidebar>
        <div  @click="handleUpdate">
          <h3 class="subtitle is-4">
            Bài viết mới nhất
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
import {notication_error,notication_success,getLoadIcon} from '@/helpers/notication';
export default {
  head() {
    return {
      title: `Đăng nhập | ${this.$siteConfig.siteName}`
    }
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
  fetchOnServer: false,
  async fetch({store}) {
    await store.dispatch('posts/actFetchLatestPost')
  },
  computed: {
    getSubTitle(){
      return `Chào mừng bạn đã quay trở lại với ${this.$siteConfig.siteName}`
    },
    typePassword() {
      if (this.isShowPassword) {
        return 'text';
      }
      return 'password';
    },
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
          this.actLogin({
            username: this.username,
            password: this.password
          })
            .then(res => {
              if (res.ok) {
                this.isLoading = false;
                notication_success(this, 'Đăng nhập thành công')
                this.$router.push('/'); // router đẩy nó sang trang home
              } else {
                notication_error(this, 'Vui lòng kiểm tra lại mật khẩu hoặc tên đăng nhập !');
                this.isLoading = false;
              }
            })
      } else {
        notication_error(this, 'Vui lòng nhập tài khoản!');
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
