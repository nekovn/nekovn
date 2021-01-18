<template>
  <a-form
    v-bind:form="form"
    v-on:submit="handleSubmit"
  >
    <!-- Name -->
    <div class="field">
      <label class="label is-medium">氏名</label>
      <div class="control has-icons-left">
        <input class="input is-medium" type="text" placeholder="山田　太郎" v-model="fullname"/>
        <span class="icon is-small is-left">
          <font-awesome-icon icon="user"/>
        </span>
      </div>
    </div>
    <!-- Email -->
    <div class="field">
      <label class="label is-medium">メールアドレス</label>
      <div class="control has-icons-left">
        <input class="input is-medium" type="email" placeholder="you@email.com" v-model="email"/>
        <span class="icon is-small is-left">
          <font-awesome-icon icon="envelope"/>
        </span>
      </div>
    </div>
    <!-- Subject -->
    <div class="field">
      <label class="label is-medium">タイトル</label>
      <div class="control has-icons-left">
        <input class="input is-medium" type="text" placeholder="聞きたいタイトル" v-model="title"/>
        <span class="icon is-small is-left">
          <font-awesome-icon icon="briefcase"/>
        </span>
      </div>
    </div>
    <!-- Message -->
    <div class="field">
      <label class="label is-medium">お問い合わせ内容</label>
      <div class="control">
        <textarea class="textarea" placeholder="コメント、リクエストなどの詳細な説明" rows="8"
                  v-model="description"></textarea>
      </div>
    </div>
    <div class="control">
      <a-button type="primary" html-type="submit" v-bind:loading="loading">
        送信
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
        notication_error(this, 'あなたの情報を入力してください !');
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
                notication_success(this, "メッセージを送信しました。 間もなく連絡たします")
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
