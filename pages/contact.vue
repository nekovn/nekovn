<template>
  <div id="contact-page" class="page-wrapper contact-page content-page">
    <site-hero
      title="お問い合わせ"
      :subtitle="getSubTitle"
      image="/uploads/contact-hero.jpg"
    ></site-hero>
    <main-section theme="sidebar-right">
      <template v-slot:default>
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">
                こんにちは!
              </p>
              <p class="subtitle">
                どうになっていますか？
              </p>
              <figure class="image is-1by1 ">
                <opti-image
                  :src="responsiveImage.src"
                  :srcset="responsiveImage.srcSet"
                />
              </figure>
              <br />
              <div class="content">
                <p>
                  <strong>
                    メールでのお問い合わせ
                  </strong>
                </p>
                <p v-html="getContent"></p>
              </div>
            </article>
          </div>
          <div class="tile is-parent is-8">
            <article class="tile is-child box">
              <contact-form />
            </article>
          </div>
        </div>
      </template>
      <template v-slot:sidebar >
        <div  @click="handleUpdate">
          <h3 class="subtitle is-4">
            速報・新着
          </h3>
          <!-- Latest Posts -->
          <posts-grid :per-row="1" :number="2"/>
        </div>
      </template>
    </main-section>
  </div>
</template>
<script>
import ContactForm from '~/components/ContactForm'
import {mapActions} from 'vuex'
import {getLoadIcon} from '@/helpers/notication';
export default {
  head() {
    return {
      title: `お問い合わせ | ${this.$siteConfig.siteName}`
    }
  },
  data(){
    return{
      image: '/uploads/admin.jpg',
    }
  },
  fetchOnServer: false,
  async fetch({store}) {
    await store.dispatch('posts/actFetchLatestPost')
  },
  components: { ContactForm },
  methods:{
    ...mapActions({
      setLoading  : 'setLoading'
    }),
    handleUpdate(e){
      //  bật loading
      getLoadIcon(this,1000);
    }
  },
  computed:{
    getContent(){
      return `このたびは<code>${this.$siteConfig.siteName}</code>のサイトをご覧いただき、ありがとうございます。
            　下記フォームに必要事項をご記入いただき『送信』ボタンを押してください。
              万が一、3日以上経ってもこちらからの返信がない場合には、お手数をおかけ致しますがもう一度ご連絡をいただきますようお願い致します。`
    },
    responsiveImage() {
      if (this.image.indexOf('/uploads') === 0) {
        return { src: require(`~/assets${this.image}`), srcSet: require(`~/assets${this.image}`) }
      }
      return { src: this.image, srcSet: '' }
    },
    getSubTitle(){
      return `お手数ですが必須項目はすべてご記入頂けます様、よろしくお願いいたします`
    },

  }
}
</script>
