<template>
  <div id="about-page" class="page-wrapper about-page content-page">
    <site-hero
      title="Đặt lại mất khẩu "
      :subtitle="getSubTitle"
      image="https://picsum.photos/1800/1805"
    ></site-hero>
    <main-section theme="sidebar-right">
      <template v-slot:default>
        <div class="tile is-parent is-10">
          <article class="tile is-child box">
            <h1 class="form-title text-center">Đặt lại mật khẩu mới </h1>
            <div class="form-login-register">
              <form action="">
                <div class="form-control">
                  <label>Email</label>
                  <input
                    v-model="email"
                    disabled="disabled"
                    type="email"
                    placeholder="Vui lòng nhập email đã đăng ký ..."
                  />
                </div>
                <div class="form-control">
                  <label>Mật khẩu mới</label>
                  <a-icon type="eye" v-on:click="handleShowPassword" v-if="!isShowPassword"/>
                  <a-icon type="eye-invisible" v-on:click="handleShowPassword" v-else/>
                  <input
                    v-bind:type="typePassword"
                    v-model="new_password"
                    placeholder="Vui lòng nhập mật khẩu mới ..."
                  />
                </div>
                <div class="form-control">
                  <label>Xác nhận mật khẩu</label>
                  <a-icon type="eye" v-on:click="handleShowPassword" v-if="!isShowPassword"/>
                  <a-icon type="eye-invisible" v-on:click="handleShowPassword" v-else/>
                  <input
                    v-bind:type="typePassword"
                    v-model="confirm_new_password"
                    placeholder="Vui lòng nhập lại mất khẩu mới..."
                  />
                </div>
                <div class="form-control">
                  <label>Mã code</label>
                  <input
                    v-model="code"
                    type="text"
                    placeholder="Vui lòng nhập mã code ..."
                  />
                </div>

                <div class="d-flex tcl-jc-between tcl-ais-center" @click="handleUpdate">
                  <a-button type="primary" v-on:click.native="handleSubmit" html-type="submit" v-bind:loading="isLoading">
                    Gửi
                  </a-button>
                  <nuxt-link class="reset-password" to="/reset-password">Quay lại?</nuxt-link>
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
import {_switch_code, notication_error, notication_success,getLoadIcon} from '@/helpers/notication';
export default {
  head() {
    return {
      title: `Đặt lại mất khẩu  | ${this.$siteConfig.siteName}`
    }
  },
  watchQuery: ['q'],
  validate({query}) {
    if (!query.q || !query.q.trim()) { // kiểm tra xem chuỗi có tồn tại hay ko
      return false;
    }
    return true;
  },
  mounted() {
    if(!this.$route.query.q || !this.$route.query.q.trim()){
      return false;
    }
    this.email = this.$route.query.q;
  },
  middleware: 'notAuthenticated',
  data(){
    return {
      isLoading: false,
      isShowPassword: false,
      email: '',
      new_password:'',
      confirm_new_password:'',
      code:''
    }
  },
  methods: {
    ...mapActions({
      setLoading  : 'setLoading',
      actCheckNewPassword: 'author/actCheckNewPassword',
      actSetNewPassword: 'author/actSetNewPassword',
    }),
    handleUpdate(e){
      //  bật loading
      getLoadIcon(this,1000);
    },
    handleSubmit(e) {
      this.isLoading = true;
      e.preventDefault(); //ngăn chặn trang web bị load lại cho chức năng submit
      if (this.email) {
        this.actCheckNewPassword({
          new_password: this.new_password,
          confirm_new_password: this.confirm_new_password,
        })
          .then(res => {
            if (res.ok) {
              if(res.password){
                this.actSetNewPassword({
                  email:this.email,
                  code:this.code,
                  password:res.password
                })
                  .then(res =>{
                    if(res.ok){
                      this.isLoading = false;
                      notication_success (this,'Mật khẩu mới đã thay đổi thành công')
                      this.$router.push('/login')
                    }else{
                      _switch_code(this,res.error.message);
                      this.isLoading = false;
                    }
                  })
              }
            } else {
              notication_error(this, res.error.message);
              this.isLoading = false;
            }
          })
      }
    },
    handleShowPassword() {
      this.isShowPassword = !this.isShowPassword
    }
  },
  components: { QuoteCard },
  fetchOnServer: false,
  async fetch({store}) {
    await store.dispatch('posts/actFetchLatestPost')
  },
  computed: {
    typePassword() {
      if (this.isShowPassword) {
        return 'text';
      }
      return 'password';
    },
    getSubTitle(){
      return `${this.$siteConfig.siteName} đã gửi cho bạn 1 mã code . Vui lòng kiểm tra email của bạn`
    },

  },
}
</script>
<style>
@import '~/assets/css/login.css';
</style>
