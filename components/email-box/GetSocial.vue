<template>
  <div>
    <a-row>
      <a-col :span="24">
    <li class="list-inline-item" v-if="getFacebook">
      <a :href="getFacebook" title="facebook" target="_blank">
        <a-icon type="facebook" style="color: #005aff;font-size: 25px"/>
      </a>
    </li>
    <li class="list-inline-item" v-if="getTwitter">
      <a :href="getTwitter" title="twitter" target="_blank">
        <a-icon type="twitter" style="color: #7fdbff;font-size: 25px"/>
      </a>
    </li>
    <li class="list-inline-item" v-if="getInstagram">
      <a :href="getInstagram" title="instagram" target="_blank">
        <a-icon type="instagram" style="color: #f13c3c;font-size: 25px"/>
      </a>
    </li>
      </a-col>
    </a-row>
  <br>
    <a-row>
      <a-col :span="24">
        <a-icon type="message"/>
        Email: <a :href="`mailto:${getEmail}`" :title="getEmail">{{ getEmail }}</a>
      </a-col>
      <a-col :span="24">
        <a-icon type="phone"/>
        TEL: <a :href="`tel:${getTell}`" :title="getTell">{{ getTell }}</a>
      </a-col>
      <a-col :span="24">
        <a-icon type="home"/>
        Địa chỉ: <nuxt-link to="#" :title="getAddress">{{ getAddress }}</nuxt-link>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: "get-social",
  async fetch({store}) {
    await store.dispatch('posts/actFetchAdminInf')
  },
  computed: {
    ...mapGetters({
      page:'posts/getAdminInf'
    }),
    getFacebook() {
      if (this.page && this.page.facebook_link) {
        return this.page.facebook_link;
      } else {
        return 'https://www.facebook.com/letgo.cuong/'
      }
    },
    getInstagram() {
      if (this.page && this.page.instagram_link) {
        return this.page.instagram_link
      } else {
        return ''
      }
    },
    getTwitter() {
      if (this.page && this.page.twitter_link) {
        return this.page.twitter_link
      } else {
        return ''
      }
    },
    getAddress() {
      if (this.page && this.page.address) {
        return this.page.address
      } else {
        return this.$siteConfig.address
      }
    },
    getEmail() {
      if (this.page && this.page.email) {
        return this.page.email
      } else {
        return this.$siteConfig.email
      }
    },
    getTell() {
      if (this.page && this.page.tell) {
        return this.page.tell
      } else {
        return this.$siteConfig.tell
      }
    }
  },
}
</script>
<style scoped>
.list-inline-item {
  display: inline-block;
}
</style>
