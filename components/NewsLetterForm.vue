<template>
  <div>
    <form name="email" action="" v-on:submit="formAction">
      <div class="field has-addons is-fullwidth">
        <p class="control has-icons-left">
          <input
            v-model="content"
            class="input"
            type="email"
            name="email"
            placeholder="Email"
          />
          <span class="icon is-small is-left">
            <font-awesome-icon icon="envelope"/>
            <i class="fas fa-envelope"></i>
          </span>
        </p>
        <div class="control">
          <a-button type="primary" html-type="submit" v-bind:loading="loading" class="button is-primary">
            {{ $siteConfig.newsletter.btnText || 'Đăng ký' }}
          </a-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {notication_error, notication_success} from "@/helpers/notication";
import {mapActions} from "vuex";

export default {
  data() {
    return {
      content: '',
      loading: false,
    }
  },
  methods: {
    ...mapActions({
      actContactForm: 'author/actContactForm'
    }),
    formAction(e) {
      this.loading = true;
      e.preventDefault(); //ngăn chặn trang web bị load lại cho chức năng submit
      if (this.$siteConfig.newsletter.mailchimp.on) {
        if (!this.content) {
          notication_error(this, 'Vui lòng nhập email để nhận bài  viết mới!');
          this.loading = false;
          return true;
        }
        const data = {
          yourName  : this.$siteConfig.newsletter.siteName,
          yourEmail : this.$siteConfig.newsletter.mailchimp.email,
          message   : this.content,
          subject   : this.$siteConfig.newsletter.title,
        };
        this.actContactForm(data)
          .then(res => {
            this.loading = false;
            if (res.ok) {
              // Thanh cong
              switch (res.message) {
                case "success":
                  notication_success(this, this.$siteConfig.newsletter.successEmail)
                  this.content = '';
                  break;
                default://nếu có lỗi
                  notication_error(this, res.message);
                  break;
              }
            } else {
              this.loading = false;
              notication_error(this, res.error);
            }
          })
      }
      return this.$siteConfig.newsletter.custom.formAction
    }
  }
}
</script>
<style>
.button.is-primary {
  height: 40px;
}
</style>
