  <template>
  <div id="categories-page" class="page-wrapper categories-page" >
    <site-hero :subtitle="getSubTitle" title="投稿カテゴリー" image="https://picsum.photos/1800/1801" />
    <main-section theme="one-column">
      <div @click="handleUpdate">
        <categories-grid :resource="mainMenuItems"/>
      </div>
    </main-section>
  </div>
</template>
<script>
import {mapGetters,mapActions} from "vuex";
import {getLoadIcon} from '@/helpers/notication';
export default {
  head() {
    return {
      title: `カテゴリ | ${this.$siteConfig.siteName}`
    }
  },
  async asyncData({store}) {
    await store.dispatch('actMainMenus')
  },
  methods:{
    ...mapActions({
      setLoading  : 'setLoading'
    }),
    handleUpdate(e){
      //  bật loading
      getLoadIcon(this,1000);
    },
  },
  computed: {
    ...mapGetters([
         'mainMenuItems'
    ]),
    getSubTitle(){
      return `ここにすべての${this.$siteConfig.siteName}の投稿カテゴリー`
    }
  }
}
</script>
