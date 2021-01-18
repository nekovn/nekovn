<template>
  <div v-if="$siteConfig.disqus.on" class="comments-wrapper section">
    <a
      v-if="$siteConfig.disqus.loadingStrategy === 'button' && !displayed"
      class="button is-fullwidth is-outlined is-large"
      @click="handleUpdate"
    >
      もっと読み込む
    </a>
    <!-- Post Detail Comments -->
    <PostComments v-if="$siteConfig.disqus.siteShortName &&
          (displayed || $siteConfig.disqus.loadingStrategy === 'onload')
      "/>
    <!-- End Post Detail Comments -->
  </div>
</template>
<script>
import PostComments from "./post-detail/PostComments";
import {getLoadIcon} from '@/helpers/notication';
import {mapActions} from 'vuex'
export default {
  name: 'DisqusComments',
  components: {PostComments},
  data() {
    return {
      displayed: false
    }
  },
  methods:{
    ...mapActions({
      setLoading  : 'setLoading'
    }),
    handleUpdate(e){
      this.displayed = true;
      //  bật loading
      getLoadIcon(this,1000);
    }
  },
}
</script>

