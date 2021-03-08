<template>
  <a-form
    v-bind:form="form"
    v-on:submit="handleSubmit"
  >
    <!-- Name -->
    <div class="field">
      <label class="label is-medium">Họ và tên</label>
      <div class="control has-icons-left">
        <input class="input is-medium" type="text" placeholder="Nguyễn Văn A" v-model="fullname"/>
        <span class="icon is-small is-left">
          <font-awesome-icon icon="user"/>
        </span>
      </div>
    </div>
    <!-- Email -->
    <div class="field">
      <label class="label is-medium">Email</label>
      <div class="control has-icons-left">
        <input class="input is-medium" type="email" placeholder="you@email.com" v-model="email"/>
        <span class="icon is-small is-left">
          <font-awesome-icon icon="envelope"/>
        </span>
      </div>
    </div>
    <!-- Subject -->
    <div class="field">
      <label class="label is-medium">Tiêu đề</label>
      <div class="control has-icons-left">
        <input class="input is-medium" type="text" placeholder="Tiêu đề muốn hỏi" v-model="title"/>
        <span class="icon is-small is-left">
          <font-awesome-icon icon="briefcase"/>
        </span>
      </div>
    </div>
    <!-- Message -->
    <div class="field">
      <label class="label is-medium">Nội dung</label>
      <div class="control">
        <textarea class="textarea" placeholder="Nhập thắc mắc , ý kiến ,góp ý v.. của bạn" rows="8"
                  v-model="description"></textarea>
      </div>
    </div>
    <div class="control">
      <a-button type="primary" html-type="submit" v-bind:loading="loading">
        Gửi
      </a-button>
    </div>
  </a-form>
</template>
<script>
import {mapActions} from 'vuex';
import {notication_error, notication_success} from "@/helpers/notication";

export default {
  data() {
    return {
      loading: false,
      form: this.$form.createForm(this, {name: 'contact'}),
      fullname: '',
      email: '',
      description: '',
      title: '',
    }
  },
  methods: {
    ...mapActions({
      actContactForm: 'author/actContactForm'
    }),
    handleSubmit(e) {
      e.preventDefault();
      // 1. Format your body response
      if (!this.fullname || !this.email || !this.description || !this.title) {
        notication_error(this, 'Vui lòng nhập đầy đủ thông tin !');
        return true;
      }
      const data = {
        yourName: this.fullname,
        yourEmail: this.email,
        message: this.description,
        subject: this.title
      };
      this.loading = true;
      this.actContactForm(data)
        .then(res => {
          this.loading = false;
          if (res.ok) {
            // Thanh cong
            switch (res.message) {
              case "success":
                notication_success(this, "Tin nhắn của bạn đã được gưi.Chúng tôi sẽ liên lạc cho bạn trong vòng 24h")
                this.fullname='';
                this.email='';
                this.title='';
                this.description=''
                break;
              default://nếu có lỗi
                notication_error(this, res.message);
                break;
            }
          } else {
            notication_error(this, res.error);
          }
        })
    },

  },
}
</script>
<style>
.ant-input {
  height: 50px;
}

</style>
