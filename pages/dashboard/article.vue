<template>
  <div>
    <a-drawer placement="right" :closable="false" :visible="visible" @close="onClose">
      <drawer-article @close="onClose" type="post"/>
    </a-drawer>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
import { getLoadIcon } from "@/helpers/notication";
export default {
  layout: 'admin',
  head() {
    return {
      title: `Đăng bài | ${this.$siteConfig.siteName}`
    }
  },
  async asyncData({store}) {
    await store.dispatch('category/actFetchCategories')
  },
  data() {
    return {
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px',
      },
      visible: true
    }
  },
  methods: {
    ...mapActions({
      setLoading  : 'setLoading'
    }),
    onClose() {
      //  bật loading
      getLoadIcon(this,3000);
      this.visible = false;
      this.$router.push('/dashboard/list-article');
    }
  }
}
</script>

