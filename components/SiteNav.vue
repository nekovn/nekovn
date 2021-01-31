<template>
  <nav
    class="navbar has-shadow is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <div @click="handleUpdate">
        <nuxt-link class="navbar-item" to="/">
          <site-logo v-if="$siteConfig.logo === 'logo-component'" />
          <img
            v-else
            :src="$siteConfig.logo"
            :alt="$siteConfig.siteName"
            class="logo"
          />
        </nuxt-link>
      </div>
      <site-search-ip/>
      <hamburger-button/>
    </div>
    <div
      :class="{
        'navbar-menu': true,
        'is-active': active
      }"
    >
      <link-card :menuClass="true" :footerClass="false" :navBarClass="true"/>
    </div>
  </nav>
</template>
<script>
import HamburgerButton from '~/components/HamburgerButton'
import SiteSearchIp from '~/components/SiteSearchIp'
import {getLoadIcon} from '@/helpers/notication';
import {mapActions} from "vuex";
export default {
  name: 'SiteNav',
  components: {HamburgerButton,SiteSearchIp},
  data() {
    return {
      active: false
    }
  },
  methods:{
    ...mapActions({
      setLoading  : 'setLoading',
    }),
    handleUpdate(e){
      //  bật loading
      this.active = false
      getLoadIcon(this,1000);

    }
  }


}
</script>
