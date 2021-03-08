<template>
  <div class="admin-layout">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo"><a-icon type="dashboard" class="icon-dashboard" :style="{'color':setColor}"/></div>
        <div>
          <a-switch
            style="width: 100%;"
            default-checked
            checked-children="オン"
            un-checked-children="オフ"
            @change="changeTheme"
          />
        </div>
        <br>
        <a-menu
          :theme="theme"
          mode="inline"
          v-bind:selectedKeys="selectedKeys"
        >
          <a-menu-item @click="handleUpdate">
            <nuxt-link to="/">
              <a-icon type="home" />
              <span>ホーム</span>
            </nuxt-link>
          </a-menu-item>
          <a-menu-item key="/dashboard" @click="handleUpdate">
            <nuxt-link to="/dashboard">
              <a-icon type="user" />
              <span>Thông tin</span>
            </nuxt-link>
          </a-menu-item>
          <a-menu-item key="/dashboard/password" @click="handleUpdate">
            <nuxt-link to="/dashboard/password">
              <a-icon type="setting" />
              <span>Thay đổi mật khẩu</span>
            </nuxt-link>
          </a-menu-item>
          <a-menu-item key="/dashboard/article" @click="handleUpdate">
            <nuxt-link to="/dashboard/article">
              <a-icon type="form" />
              <span>Đăng bài</span>
            </nuxt-link>
          </a-menu-item>
          <a-menu-item key="/dashboard/list-article" @click="handleUpdate">
            <nuxt-link to="/dashboard/list-article">
              <a-icon type="ordered-list" />
              <span>Danh sách</span>
            </nuxt-link>
          </a-menu-item>
          <a-menu-item key="/dashboard/pending-article" @click="handleUpdate">
            <nuxt-link to="/dashboard/pending-article">
              <a-icon type="alert" />
              <span>Thư nháp</span>
            </nuxt-link>
          </a-menu-item>
          <a-menu-item key="/dashboard/mailbox" @click="handleUpdate">
            <nuxt-link to="/dashboard/mailbox">
              <a-icon type="mail"/>
              <span>Hộp thư</span>
            </nuxt-link>
          </a-menu-item>
          <a-menu-item v-on:click="handleLogout" >
              <a-icon type="logout" />
              <span>Đăng xuất</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="admin-layout__header" v-on:click="handleToggleSidebar">
          <a-icon
            class="trigger"
            v-bind:type="iconHeader"
          />
        </a-layout-header>
        <a-layout-content class="admin-layout__content">
          <Nuxt />
        </a-layout-content>
        <a-layout-footer style="textAlign: center">
          {{ $siteConfig.siteName }} &copy; {{ new Date().getFullYear() }} -
          Inc. All Rights Reserved.
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <div :class="{show:this.isLoading,loading:true}" >
      <AppLoadingSvg/>
    </div>
  </div>
</template>

<script>
import antDesignVue from '@/plugins/ant-design-vue';
import {mapActions,mapState} from "vuex";
import {getLoadIcon} from "@/helpers/notication";
export default {
  beforeCreate() {
    antDesignVue();
  },

  //trùng với tên file middleware/notAuthenticated
  middleware: 'Authenticated',
  mounted() {
    setInterval(() => {
      if (!document.cookie) {
        this.actResetCurrentUser();
      }
    }, 3000)
  },
  data() {
    return {
      collapsed: false,
      theme: 'light',
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,

    }),
    iconHeader() {
      return this.collapsed ? 'menu-unfold' : 'menu-fold';
    },
    selectedKeys() {
      return [ this.$route.path ]
    },
    setColor(){
      if(this.collapsed){
        return '#3298dc'
      }
      return '#fff'
    },
  },
  methods: {
    changeTheme(checked) {
      this.theme     = checked ? 'light' : 'dark';
      this.collapsed = !this.collapsed;
    },
    handleToggleSidebar() {
      this.collapsed = !this.collapsed;
    },
    ...mapActions({
      actLogout: 'author/actLogout',
      actResetCurrentUser: 'author/actResetCurrentUser',
      setLoading  : 'setLoading'
    }),
    handleUpdate(e){
      //  bật loading
      getLoadIcon(this,2000);
    },
    handleLogout(){
      this.actLogout();
      this.setLoading(true);
      setTimeout(()=>{
        this.$router.push('/login');
        this.setLoading(false);
      },1000)
    }
  },

}
</script>

<style>
.ant-layout-sider-dark{
  flex: 0 0 170px;
  max-width: 170px;
  min-width: 100px;
  width: 100px;
}
.loading{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  background-color: rgba(0, 255, 255, 0.13);
}
.show{
  opacity: 1;
  visibility: visible;
}
.loading svg{
  width: 100px;
  position: fixed;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%) scale(0.4);
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  margin: 16px;
}

.admin-layout__content {
  margin: 24px 16px;
  padding: 24px;
  background-color: #fff;
  min-height: 280px;
}
.admin-layout__header {
  padding: 0;
  background-color: #fff;
}
.icon-dashboard{
  width: 100%;
  font-size: 30px;
}
</style>
