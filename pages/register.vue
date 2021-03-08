<template>
  <div id="about-page" class="page-wrapper about-page content-page">
    <site-hero
      title="Đăng ký"
      :subtitle="getSubTitle"
      image="https://picsum.photos/1800/1803"
    ></site-hero>
    <main-section theme="sidebar-right">
      <template v-slot:default>
        <div class="tile is-parent is-10">
          <article class="tile is-child box">
            <h1 class="form-title text-center">Đăng ký</h1>
            <div class="form-login-register">
              <form action="">
                <div class="form-control">
                  <label for="">Tên đăng nhập</label>
                  <input
                    v-model="username"
                    type="text"
                    placeholder="Vui lòng nhập tên đăng nhập..."
                  />
                </div>
                <div class="form-control">
                  <label for="">Email</label>
                  <input
                    v-model="email"
                    type="text"
                    placeholder="Vui lòng nhập email...."
                  />
                </div>
                <div class="form-control">
                  <label for="">Mật khẩu</label>
                  <a-icon type="eye" v-on:click="handleShowPassword" v-if="!isShowPassword"/>
                  <a-icon type="eye-invisible" v-on:click="handleShowPassword" v-else/>
                  <input
                    v-model="password"
                    v-bind:type="typePassword"
                    placeholder="Vui lòng nhập mật khẩu ..."
                  />
                </div>
                <div class="form-control">
                  <label for="">Nhập lại mật khẩu</label>
                  <a-icon type="eye" v-on:click="handleShowPassword" v-if="!isShowPassword"/>
                  <a-icon type="eye-invisible" v-on:click="handleShowPassword" v-else/>
                  <input
                    v-model="confirm_password"
                    v-bind:type="typePassword"
                    placeholder="Vui lòng nhập lại mật khẩu..."
                  />
                </div>
                <div class="d-flex tcl-jc-between tcl-ais-center" @click="handleUpdate">
                  <a-button type="primary" v-on:click.native="handleSubmit" html-type="submit" v-bind:loading="isLoading">
                    Đăng ký
                  </a-button>
                  <nuxt-link class="reset-password" to="/login">Bạn đã có tài khoảng?</nuxt-link>
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
import {_switch} from '@/helpers/notication';
export default {
  head() {
    return {
      title: `登録 | ${this.$siteConfig.siteName}`
    }
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
  components: { QuoteCard },
  fetchOnServer: false,
  async fetch({store}) {
    await store.dispatch('posts/actFetchLatestPost')
  },
  computed: {
    getSubTitle(){
      return `Đăng ký tài khoảng để cùng nhau khám phá ${this.$siteConfig.siteName}`
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
        notication_error(this,'Mật khẩu nhập lại không khớp !');
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
            notication_success (this,'Đăng ký tài khoảng thành công')
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


}
</script>
<style>
@import '~/assets/css/login.css';
</style>
