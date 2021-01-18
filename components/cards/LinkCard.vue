<template>
    <ul :class="{'navbar-end':menuClass}">
      <li
        v-for="item in $siteConfig.mainMenu"
        :key="item.link"
        :class="{'navbar-footer':footerClass,'navbar-item':navBarClass}"
        @click="handleUpdate"
      >
        <component
          :is="item.link.startsWith('http') ? 'a' : 'nuxt-link'"
          :href="item.link"
          :to="item.link"
          :target="item.target ? item.target : '_self'"
        >
          {{ item.name }}
        </component>
      </li>
      <li v-if="isLogin" :class="{'navbar-footer':footerClass,'navbar-item':navBarClass}"  @click="handleUpdate">
        <nuxt-link :to="authorLink">
          <a-icon type="user"/>
          {{ currentUser.name }}
        </nuxt-link>
      </li>
      <li v-if="isAdmin || isEditor || isAuthor" :class="{'navbar-footer':footerClass,'navbar-item':navBarClass}" @click="handleUpdate">
        <a v-if="isAdmin" href="/blogs/phamcuong/" target="_blank">
          <a-icon type="crown"/>
          管理者</a>
        <a v-if="isEditor" href="/blogs/phamcuong/" target="_blank">
          <a-icon type="crown"/>
          編集者</a>
        <a v-if="isAuthor" href="/blogs/phamcuong/" target="_blank">
          <a-icon type="crown"/>
          著者</a>
      </li>
      <li v-if="isLogin" :class="{'navbar-footer':footerClass,'navbar-item':navBarClass}" @click="handleUpdate">
        <nuxt-link to="/dashboard">
          <a-icon type="tool"/>
          設定
        </nuxt-link>
      </li>
      <li v-if="isLogin" :class="{'navbar-footer':footerClass,'navbar-item':navBarClass}" @click="handleLogout">
        <a>
          <a-icon type="logout"/>
          ログアウト</a>
      </li>
      <li v-if="!isLogin" :class="{'navbar-footer':footerClass,'navbar-item':navBarClass}" @click="handleUpdate">
        <nuxt-link to="/login">
          <a-icon type="login"/>
          ログイン
        </nuxt-link>
      </li>
      <li v-if="!isLogin" :class="{'navbar-footer':footerClass,'navbar-item':navBarClass}" @click="handleUpdate">
        <nuxt-link to="/register">
          <a-icon type="edit"/>
          登録
        </nuxt-link>
      </li>
      <li v-if="menuClass" class="navbar-item site-search-wrapper">
        <site-search />
      </li>
    </ul>
</template>

<script>
import SiteSearch from '~/components/SiteSearch'
import {mapActions, mapGetters, mapState} from "vuex";
import {getLoadIcon} from '@/helpers/notication';

export default {
  name: "link-card",
  props:{
    menuClass   : {Boolean,default:false},
    footerClass : {Boolean,default:true},
    navBarClass : {Boolean,default:false}
  },
  components: {SiteSearch},
  computed: {
    ...mapGetters([
      'mainMenuItems',
    ]),
    authorLink() {
      return `/user/${this.currentUser.id}`
    },
    ...mapGetters({
      isLogin: 'author/isLogin',
      isAdmin: 'author/isAdmin',
      isEditor: 'author/isEditor',
      isAuthor: 'author/isAuthor',
    }),
    ...mapState({
      currentUser: state => state.author.currentUser
    }),

  },
  methods: {
    ...mapActions({
      actLogout: 'author/actLogout',
      setLoading: 'setLoading',
    }),
    handleUpdate(e) {
      //  bật loading
      getLoadIcon(this, 3000);
    },

    handleLogout() {
      this.actLogout();
      this.setLoading(true);
      setTimeout(() => {
        this.$router.push('/login');
        this.setLoading(false);
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar-burger {
  height: auto;
}
.navbar-menu a {
  display: block;
  font-size: 1.2em;
}
.site-search-wrapper {
  transform: translateX(5px);
@media (max-width: 1023px) {
  display: none;
}
}
.navbar-item img {
  max-height: 2rem;
}
.navbar-footer {
  font-size:15px;
  margin-top: 10px;
}

</style>
