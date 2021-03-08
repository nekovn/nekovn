<template>
  <div>
    <a-row class="style-md" v-bind:gutter="30">
      <a-col v-bind:md="16">
        <a-form
          v-bind:form="form"
          v-bind:label-col="{ span: 8 }"
          v-bind:wrapper-col="{ span: 16 }"
          v-on:submit="handleSubmit"
        >
          <!-- Username -->
          <a-form-item label="Tên đăng nhập">
            <a-input
              v-decorator="['user_name', {
                  initialValue: this.getUserName
              }]"
              v-bind:disabled="true"
            />
          </a-form-item>
          <!-- Email -->
          <a-form-item label="Email">
            <a-input
              v-bind:disabled="true"
              v-decorator="['email', {
                  initialValue: this.getUserEmail
              }]"
            />
          </a-form-item>


          <a-form-item label="Biệt dạnh">
            <a-input
              v-decorator="['nickname', {
                  rules: [
                    { required: true, message: 'Vui lòng nhập biệt danh !' }
                  ],
                  initialValue: this.getUserNickName
              }]"
            />
          </a-form-item>

          <a-form-item label="Họ và tên">
            <a-input
              v-decorator="['fullname', {
                  rules: [
                    { required: true, message: 'Vui lòng nhập họ và tên của bạn !' }
                  ],
                  initialValue: this.fullname
              }]"
            />
          </a-form-item>
          <a-form-item label="Giới thiệu">
            <a-textarea
              v-decorator="['description', {
                initialValue: this.getUserDescription
              }]"
              v-bind:auto-size="{ minRows: 5 }"
            />
          </a-form-item>

          <!-- Button Submit -->
          <a-form-item v-bind:wrapper-col="{ span: 16, offset: 8 }">
            <a-button type="primary" html-type="submit" v-bind:loading="loading">
              Đăng bài
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col v-bind:md="8">
        <p>Tải ảnh đại diện</p>
        <a-upload
          name="avatar"
          list-type="picture-card"
          class="cus-avatar-uploader avatar-uploader"
          v-bind:show-upload-list="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          v-bind:customRequest="handleCustomRequest"
        >
          <img v-if="getAvatar" v-bind:src="getAvatar" alt="avatar"/>
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'"/>
            <div class="ant-upload-text">
              Tải lên
            </div>
          </div>
        </a-upload>
      </a-col>
    </a-row>
    <a-row class="style-sm" v-bind:gutter="30">
      <a-col v-bind:sm="12" v-bind:md="8">
        <p>Tải ảnh đại diện</p>
        <a-upload
          name="avatar"
          list-type="picture-card"
          class="cus-avatar-uploader avatar-uploader"
          v-bind:show-upload-list="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          v-bind:customRequest="handleCustomRequest"
        >
          <img v-if="getAvatar" v-bind:src="getAvatar" alt="avatar"/>
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'"/>
            <div class="ant-upload-text">
              Tải lên
            </div>
          </div>
        </a-upload>
      </a-col>
      <a-col v-bind:sm="12" v-bind:md="16">
        <a-form
          v-bind:form="form"
          v-bind:label-col="{ span: 8 }"
          v-bind:wrapper-col="{ span: 16 }"
          v-on:submit="handleSubmit"
        >
          <!-- Username -->
          <a-form-item label="Tên đăng nhập">
            <a-input
              v-decorator="['user_name', {
                  initialValue: this.getUserName
              }]"
              v-bind:disabled="true"
            />
          </a-form-item>
          <!-- Email -->
          <a-form-item label="Email">
            <a-input
              v-bind:disabled="true"
              v-decorator="['email', {
                  initialValue: this.getUserEmail
              }]"
            />
          </a-form-item>


          <a-form-item label="Biệt danh">
            <a-input
              v-decorator="['nickname', {
                  rules: [
                    { required: true, message: 'Vui lòng nhập biệt danh của bạn !' }
                  ],
                  initialValue: this.getUserNickName
              }]"
            />
          </a-form-item>

          <a-form-item label="Họ và tên">
            <a-input
              v-decorator="['fullname', {
                  rules: [
                    { required: true, message: 'Vui lòng nhập họ và tên của bạn !' }
                  ],
                  initialValue: this.fullname
              }]"
            />
          </a-form-item>
          <a-form-item label="Giới thiệu">
            <a-textarea
              v-decorator="['description', {
                initialValue: this.getUserDescription
              }]"
              v-bind:auto-size="{ minRows: 5 }"
            />
          </a-form-item>

          <!-- Button Submit -->
          <a-form-item v-bind:wrapper-col="{ span: 16, offset: 8 }">
            <a-button type="primary" html-type="submit" v-bind:loading="loading">
              Lưu thông tin
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {notication_error, notication_success} from "@/helpers/notication";

export default {
  layout: 'admin',
  watchQuery: ['page'],
  head() {
    return {
      title: `Thông tin | ${this.$siteConfig.siteName}`
    }
  },
  data() {
    return {
      loading: false,
      form: this.$form.createForm(this, {name: 'coordinated'}),
      fileUpload: {
        file: null,
        base64: ''
      }
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.author.currentUser
    }),

    getUserEmail(){
      if (this.currentUser && this.currentUser.email){
        return this.currentUser.email;
      }else{
        return this.$siteConfig.userEmpty
      }
    },
    getUserName(){
      if (this.currentUser && this.currentUser.user_name){
        return this.currentUser.user_name;
      }else{
        return this.$siteConfig.userEmpty
      }
    },
    getUserDescription(){
      if (this.currentUser && this.currentUser.description){
        return this.currentUser.description;
      }else{
        return this.$siteConfig.userEmpty
      }
    },
    getUserNickName(){
      if (this.currentUser && this.currentUser.nickname){
        return this.currentUser.nickname;
      }else{
        return this.$siteConfig.userEmpty
      }
    },
    fullname() {
      if (this.currentUser && this.currentUser.last_name && this.currentUser.first_name){
        return  this.currentUser.last_name + ' ' + this.currentUser.first_name
      }else{
        return this.$siteConfig.userEmpty
      }
    },
    getAvatar() {
      if (this.fileUpload.base64) {
        return this.fileUpload.base64;
      }
      if (this.currentUser && this.currentUser.simple_local_avatar) {
        return this.currentUser.simple_local_avatar.full;
      }
      return ''
    }
  },
  methods: {
    ...mapActions({
      actUpdateProfile: 'author/actUpdateProfile',
    }),

    splitFullName(fullNameStr) {
      var arrFullName = fullNameStr.split(' ').filter(str => str !== '');

      var first_name = arrFullName.pop();
      var last_name = arrFullName.join(' ');

      return {
        first_name,
        last_name
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const { first_name, last_name } = this.splitFullName(values.fullname);
          const data = {
            file: this.fileUpload.file,
            first_name,
            last_name,
            nickname: values.nickname,
            description: values.description,
          }
          this.loading = true
          this.actUpdateProfile(data)
            .then( res => {
              if (res.ok) {
                this.fileUpload = {
                  file: null,
                  base64: ''
                }
                notication_success (this,'Đã thay đổi thông tin thành công')
                this.loading = false;
              } else {
                notication_error(this,res.error);
                this.loading = false;
              }
              this.loading = false;
            })
        }
      });
    },
    validateImages(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        // this.$message.error('You can only upload JPG file!');
        notication_error(this,'Định dạng ảnh không đúng.Vui lòng tải file (jpg,png)');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        notication_error(this,'Kích thước file phải nhỏ hơn 2MB');
        return false;
      }
      return true;
    },
    handleCustomRequest({ file }) {
      if (this.validateImages(file) === false) {
        return;
      }
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.fileUpload = {
          file: file,
          base64: reader.result
        }
      });
      reader.readAsDataURL(file);
    }
  },
}
</script>

<style>
.cus-avatar-uploader .ant-upload.ant-upload-select-picture-card > .ant-upload {
  padding: 0;
}

.cus-avatar-uploader .ant-upload.ant-upload-select-picture-card > .ant-upload img {
  width: 130px;
  height: 130px;
  object-fit: cover;
}

.cus-avatar-uploader .ant-upload.ant-upload-select-picture-card {
  width: 130px;
  height: 130px;
}
.style-sm{
  display: none;
}

@media screen and (max-width: 575px) {
  /*    khu vực màn hình tử 576px trở xướng  dành cho di động*/
  .style-sm{
    display: block;
  }
  .style-md{
    display: none;
  }
}
</style>
