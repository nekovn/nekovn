<template>
  <div id="about-page" class="page-wrapper about-page content-page">
    <site-hero
      title="Lấy lại mật khẩu"
      :subtitle="getSubTitle"
      image="https://picsum.photos/1800/1804"
    ></site-hero>
    <main-section theme="sidebar-right">
      <template v-slot:default>
        <div class="tile is-parent is-10">
          <article class="tile is-child box">
            <h1 class="form-title text-center">Lấy lại mật khẩu</h1>
            <div class="form-login-register">
              <form action="">
                <div class="form-control">
                  <label>Email</label>
                  <input
                    v-model="email"
                    type="text"
                    placeholder="Vui lòng nhập tài khoảng email đã đăng ký ..."
                  />
                </div>
                <div class="d-flex tcl-jc-between tcl-ais-center" @click="handleUpdate">
                  <a-button type="primary" v-on:click.native="handleSubmit" html-type="submit" v-bind:loading="isLoading">
                    Gửi
                  </a-button>
                  <nuxt-link class="reset-password" to="/login">Đăng nhập</nuxt-link>
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
import antDesignVue from '@/plugins/ant-design-vue';
import {notication_error,getLoadIcon} from '@/helpers/notication';
export default {
  head() {
    return {
      title: `Lấy lại mật khẩu | ${this.$siteConfig.siteName}`
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
  fetchOnServer: false,
  async fetch({store}) {
    await store.dispatch('posts/actFetchLatestPost')
  },
  computed: {
    getSubTitle(){
      return `Hãy để chúng tôi giúp bạn lấy lại mất khẩu`
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
                message: 'Chúng tôi đã gửi cho bạn 1 mã code đến email của bạn',
                description: 'Nếu chưa nhận được mã code.Vui lòng liên lạc cho chúng tôi',
              });
              this.$router.push({
                  path: '/set-password',
                query: {
                  q: this.email
                }
              })
            } else {
              this.email = '';
              notication_error(this, 'Email của bạn chưa đăng ký.Vui lòng nhập chính xác email bạn đã đăng ký tài khoảng！');
              this.isLoading = false;
            }
          })
      }else{
        notication_error(this, 'Vui lòng nhập email đã đăng ký！');
        this.isLoading = false;
      }
    },
  }
}
</script>
<style>
@import '~/assets/css/login.css';
</style>
