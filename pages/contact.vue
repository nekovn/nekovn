<template>
  <div id="contact-page" class="page-wrapper contact-page content-page">
    <site-hero
      title="Liên hệ"
      :subtitle="getSubTitle"
      image="/uploads/contact-hero.jpg"
    ></site-hero>
    <main-section theme="sidebar-right">
      <template v-slot:default>
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">
                Xin chào!
              </p>
              <p class="subtitle">
                Bạn đang gặp vần đề？
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
                    Liên hệ qua Email
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
import ContactForm from '~/components/ContactForm'
import {mapActions} from 'vuex'
import {getLoadIcon} from '@/helpers/notication';
export default {
  head() {
    return {
      title: `Liên hệ | ${this.$siteConfig.siteName}`
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
      return `Bạn chỉ cần điền đầy đủ thông tin cá nhân và vấn đề trao đổi với <code>${this.$siteConfig.siteName}</code> vào form , sau khi nhận được thông tin này chúng tôi sẽ liên hệ với các bạn trong thời gian sớm nhất.`
    },
    responsiveImage() {
      if (this.image.indexOf('/uploads') === 0) {
        return { src: require(`~/assets${this.image}`), srcSet: require(`~/assets${this.image}`) }
      }
      return { src: this.image, srcSet: '' }
    },
    getSubTitle(){
      return `Nêu có vần đề gì cần trao đổi hãy liên lạc cho chúng tôi`
    },

  }
}
</script>
