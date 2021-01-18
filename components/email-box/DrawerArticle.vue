<template>
  <div>
    <a-row>
        <a-col :span="12">
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="cus-avatar-uploader avatar-uploader"
            v-bind:show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            v-bind:customRequest="handleCustomRequest"
          >
            <img v-if="getThumbnail" v-bind:src="getThumbnail" alt="avatar"/>
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'"/>
              <div class="ant-upload-text">
                アップロード
              </div>
            </div>
          </a-upload>
        </a-col>
      </a-row>
    <a-divider />
    <a-row>
      <a-col :span="24">
        <a-form
          v-bind:form="form"
          v-bind:wrapper-col="{ span: 24 }"
          v-on:submit="handleSubmit"
        >
          <a-form-item>
            <a-input
              placeholder="タイトル"
              v-decorator="['title', {
                  rules: [
                    { required: true, message: 'タイトルを入力してください !' },
                    { whitespace: true, message: 'タイトルにスペースを含めることはできません !' },
                    { max: 100 , message: 'タイトルは最大100文字である必要があります !' },
                    { min: 10  , message: 'タイトルは10文字以上である必要があります !' },
                    { type: 'string', message: 'タイトルはテキストである必要があります !' },
                    { pattern:new RegExp ('[^!@#$%^)(&*[_|+=?;,.<>]$'), message: 'タイトル特別な文字はありません !'},
                  ],
                  initialValue: getTitle,
              }]"
            />
          </a-form-item>
          <tinymce id="d1" v-model="data"></tinymce>
          <a-select :value="getCategories" v-if="getCategories" has-feedback style="margin-top: 10px;margin-bottom: 10px;" disabled>
          </a-select>
          <a-form-item  has-feedback style="margin-top: 10px;margin-bottom: 10px;">
            <a-select
              style="width: 100%"
              v-decorator="[
          'select',
          { rules: [{ required: true, message: 'カテゴリを選択してください !' }] },
        ]"
              placeholder="カテゴリ"
            >
              <template v-for="(item,index) in categoriesList">
                <a-select-option  :value="item.id" :key="index">
                  {{item.name}}
                </a-select-option>
              </template>
            </a-select>
          </a-form-item>
          <!-- Button Submit -->
          <a-form-item v-bind:wrapper-col="{ span: 16, offset: 8 }" class="button-upload" >
            <a-button type="primary" html-type="submit" v-bind:loading="loading" >
              投稿
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
    <drawer-contact :style="pStyle" @close="handleClose"/>
  </div>
</template>

<script>
import slug from 'limax';
import {mapState, mapActions} from 'vuex';
import tinymce from '~/components/TinymceVue'
import {notication_error, notication_success, getLoadIcon} from "@/helpers/notication";
export default {
  name: "drawer-article",
  layout: 'admin',
  components: {
    tinymce
  },
  props:{
    title       : {type: String, default: ''},
    type        : {type: String, default: ''},
    post        : {type: String, default: ''},
    content     : {type: String, default: ''},
    categories  : {type: String, default: ''},
    image       : {type: String, default: ''},
    id          : {type: Number, default: 0},
  },
  data(){
    return {
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px',
      },
      loading: false,
      form: this.$form.createForm(this, {name: 'coordinated'}),
      fileUpload: {
        file: null,
        base64: ''
      },
      data: '',
      selectVal: '',
      selectName:''
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.content) {
        this.data = this.content;
      } else {
        this.data = ''
      }
    }, 1000)

  },
  computed: {
    ...mapState({
      author_id: state => state.author.currentUser.id,
      categoriesList: state => state.category.categoriesList
    }),
    getId(){
      if (this.id) {
        return this.id;
      } else {
        return this.author_id;
      }
    },
    getTitle() {
      if (this.title) {
        return this.title;
      } else {
        return ''
      }
    },
    getCategories(){
      if(this.categories){
        return this.categories
      }else{
        return  ''
      }
    },
    getThumbnail() {
      if (this.fileUpload.base64) {
        return this.fileUpload.base64;
      }
      if (this.image) {
        return this.image;
      }
      return ''
    },
  },
  methods: {
    ...mapActions({
      actEditPostOfUser: 'author/actEditPostOfUser',
      actUpdatePostOfUser:'author/actUpdatePostOfUser',
      setLoading  : 'setLoading'
    }),
    handleClose(e){
      //kích hoạt 1 event để thay đổi data của nó
      this.$emit('close');
    },
    validateTitle(title_text){
      return title_text.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').trim();
    },
    validateContent(content){
      const length = content.trim().length;
      if(length <= 100){
        return  false;
      }
      return  true;
    },
    convertToSlug(Text) {
      const string = this.validateTitle(Text);
      return slug(string);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          if(!this.validateContent(this.data)){
            notication_error(this,'コンテンツは100文字を超える必要があります !');
            this.loading = false;
            return;
          }
          if (!this.getThumbnail) {
            notication_error(this, '記事のアバターをアップロードしてください !');
            this.loading = false;
            return;
          }
          if (!this.data) {
            notication_error(this, '記事の内容を入力してください !');
            this.loading = false;
            return;
          }

          //  bật loading
          getLoadIcon(this,5000);
          if(this.type == "post"){
            const data = {
              post_title    : this.validateTitle(values.title),
              post_name     : this.convertToSlug(values.title),
              post_category : values.select,
              post_content  : this.data,
              post_author   : this.getId,
              file          : this.fileUpload.file,
            }
            this.actUpdatePostOfUser(data)
              .then(res => {
                if (res.ok) {
                  this.form.resetFields(); // reset lại form khi doi password thanh cong
                  this.fileUpload = {
                    file: null,
                    base64: ''
                  }
                  this.data = ''
                  notication_success(this, '記事が正常に更新されました')
                  this.loading = false;
                  this.$router.push('/dashboard/list-article')
                } else {
                  notication_error(this, 'もう一度記事をチェックしてください !');
                  this.loading = false;
                }
              })
          }
          if(!this.type){
            const data = {
              title      : this.validateTitle(values.title),
              slug       : this.convertToSlug(values.title),
              categories : values.select,
              content    : this.data,
              file       : this.fileUpload.file,
              id         : this.getId
            }
            this.actEditPostOfUser(data)
              .then(res => {
                if (res.ok) {
                  this.form.resetFields(); // reset lại form khi doi password thanh cong
                  this.fileUpload = {
                    file: null,
                    base64: ''
                  }
                  this.data = ''
                  notication_success(this, '記事が正常に更新されました')
                  this.loading = false;
                  this.$router.push('/dashboard/article')
                } else {
                  notication_error(this, 'もう一度記事をチェックしてください !');
                  this.loading = false;
                }
              })
          }

        } else {
          notication_error(this, 'もう一度記事をチェックしてください !');
          this.loading = false;
        }
      });
    },
    validateImages(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        // this.$message.error('You can only upload JPG file!');
        notication_error(this, '無効な画像形式（jpeg,png）');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        notication_error(this, '画像サイズは2MB未満である必要があります');
        return false;
      }
      return true;
    },
    handleCustomRequest({file}) {
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
  }
}
</script>

<style scoped>
.list-inline-item {
  display: inline-block;
}
.avatar-uploader {
  position: relative;
  left: 80%;
}
.button-upload {
  left: 10%;
}
@media screen and (max-width: 575px) {
  .avatar-uploader {
    position: relative;
    left: 50%;
  }
}
@media all and (device-width: 768px) and (device-height: 1024px) and (orientation:portrait) {
  .avatar-uploader {
    position: relative;
    left: 80%;
  }
  .button-upload{
    left: 10%;
  }
}
@media all and (device-width: 1024px) and (device-height: 768px) and (orientation:landscape) {
  .avatar-uploader {
    position: relative;
    left: 80%;
  }
  .button-upload{
    left: 10%;
  }
}
</style>
