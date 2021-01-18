<template>
  <div>
    <a-row v-bind:gutter="40">
      <a-col v-bind:sm="24" v-bind:md="12">
        <a-form
          v-bind:form="form"
          v-bind:label-col="{ span: 8 }"
          v-bind:wrapper-col="{ span: 16 }"
          v-on:submit="handleSubmit"
        >
          <!-- Old Password -->
          <a-form-item label="以前のパスワード" has-feedback>
            <a-input-password
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      required: true,
                      message: '以前のパスワードを入力する必要があります!',
                    }
                  ],
                },
              ]"
            />
          </a-form-item>
          <!-- New password -->
          <a-form-item label="新しいパスワード" has-feedback>
            <a-input-password
              v-decorator="[
                'new_password',
                {
                  rules: [
                    {
                      required: true,
                      message: '新しいパスワードを入力する必要があります！',
                    },
                    {
                      validator: validateToConfirmPassword,
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <!-- Confirm password -->
          <a-form-item label="新しいパスワード(確認)" has-feedback>
            <a-input-password
              v-decorator="[
                'confirm_new_password',
                {
                  rules: [
                    {
                      required: true,
                      message: '新しいパスワード（確認）を入力する必要があります！',
                    },
                    {
                      validator: compareToNewPassword,
                    },
                  ],
                },
              ]"
              v-on:blur="handleConfirmBlur"
            />
          </a-form-item>
          <!-- Button Submit -->
          <a-form-item v-bind:wrapper-col="{ span: 16, offset: 8 }">
            <a-button type="primary" html-type="submit" v-bind:loading="loading">
              パスワード変更
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import {notication_error, notication_success} from "@/helpers/notication";
export default {
  layout: 'admin',
  data() {
    return {
      loading: false,
      isTouchedConfirmValue: false,
      form: this.$form.createForm(this, { name: 'coordinated' }),
    }
  },
  head() {
    return {
      title: `パスワード | ${this.$siteConfig.siteName}`
    }
  },
  methods: {
    ...mapActions({
      actChangePassword: 'author/actChangePassword'
    }),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.loading = true;
          this.actChangePassword(values)
            .then(res => {
              this.loading = false;
              if (res.ok) {
                // Thanh cong
                notication_success (this,'パスワードは正常に変更されました')
                this.form.resetFields(); // reset lại form khi doi password thanh cong
              } else {
                notication_error(this,res.error);
              }
            })
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.isTouchedConfirmValue = this.isTouchedConfirmValue || !!value;
      //!!value : phủ định 2 lần ng dùng nhập vào
      // Sự kiện blur mô tả việc người dùng đã nhấn chuột vào ô input
      // -> Sau đó nhấn chuột ra ngoài -> sự kiện blur nó sẽ được kích hoạt
      // Nếu chưa nhập -> confirmDirty = false, value = '' -> false || false -> false
      // nếu nhập thông tin rồi : confirmDirty = false, value = 'abc' -> false || true -> true
    },
    compareToNewPassword(rule, confirm_new_password, callback) {
      const form = this.form;
      if (confirm_new_password && confirm_new_password !== form.getFieldValue('new_password')) {
        callback('確認パスワードが一致しません!');
      } else {
        callback(); // Không có dòng thông báo lỗi
      }
    },
    validateToConfirmPassword(rule, new_password, callback) {
      const form = this.form;
      if (new_password && this.isTouchedConfirmValue) {
        // Nếu người dùng đã nhập vào new password
        // Và cũng đã nhập thông tin vào ô input thứ 3
        form.validateFields(['confirm_new_password'], { force: true }); // Gọi hàm validate dữ liệu cho confirm
      //  force:true bắt buộc
      }
      callback(); // Không có dòng thông báo lỗi
    },
  },
}
</script>
<style>
</style>
