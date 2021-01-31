<template>
  <div>
    <div v-if="!resource.length && isLoading">
      {{ $siteConfig.noPost }}
    </div>
    <presentational-grid
      v-else
      :items="resource"
      :bottom-loader="isLoading"
      :theme="theme"
      :per-row="perRow"
      @atEnd="handleLoadMore()"
    >
      <template v-slot:default="{ item }">
        <slot :item="item"></slot>
      </template>
    </presentational-grid>
  </div>
</template>

<script>
import PresentationalGrid from './PresentationalGrid'
import {mapActions,mapGetters} from 'vuex';
export default {
  name: 'ResourceGrid',
  components: { PresentationalGrid },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    //required:true bắt buộc ,
    resource : { required: true },
    theme    : { type: String, default: 'blocks' },
    perRow   : { type: Number, default: 3 },
    id       : { type: Object, default: null },
    category: {
      type: Array,
      default() {
        return []
      }
    },
  },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters({
      wpTotalPages:'posts/getWpTotalPages',
      curPage:'posts/getCurrentPage',
      articles:'posts/getArticles',
    }),
    hasMoreArticles(){
      return this.curPage < this.wpTotalPages
    },
  },
  methods: {
    ...mapActions({
      actFetchArticlesList: 'posts/actFetchArticlesList'
    }),
    handleLoadMore(e) {
      if(this.isLoading || !this.hasMoreArticles){ // neu = false thi chay luon ko chay api
        return true;
      }
      this.isLoading = true; // truoc khi goi api cho loading bang true cho no chay vong tron
      if(this.id){// if have a id of category from search by category then add id categories
        this.actFetchArticlesList({
          curPage: this.curPage + 1,
          categories: [this.id.id]
        })
          .then(() => {
            this.isLoading = false; // tat di vong tron loading
          })
      }else{
        this.actFetchArticlesList({
          curPage : this.curPage + 1,
        })
          .then(()=>{
            this.isLoading = false; // tat di vong tron loading
          })
      }

    }
  }


}
</script>
