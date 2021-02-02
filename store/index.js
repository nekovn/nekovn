import {RecursiveMenuItems, getTokenFromCookie} from '@/helpers'

export const state = () => {
  return {
    appMainMenus: {
      items: []
    },
    isLoading:false,
    pageType: '',
    title: '',
    subtitle: '',
    featureImage: '',
    url:'',

  }
}
export const mutations = {

  setAppMainMenus(state, data) {
    state.appMainMenus = data;
  },
  SET_LOADING(state, loading= false){
    state.isLoading = loading
  },
  set(state, data) {
    state = Object.assign(state, data)
  },
}
// gettters để ánh xạ lại 1 mãng dữ liệu mới
export const getters = {
  mainMenuItems(rootState) {
    const newItems = rootState.appMainMenus.items.map(item => {
      return RecursiveMenuItems(item);
    })
    return newItems;
  },
}
export const actions = {
  setLoading({commit}, loading=false) {
    commit('SET_LOADING',loading)
  },
  async nuxtServerInit ({commit, dispatch}, {req}) { // gọi api toàn cục của trang web
    //dữ liệu dung chung cho tất cả các trang
    //nuxtServerInit hàm mặc định của nuxt để gọi ở phía sever
    const token = getTokenFromCookie(req);
    const data  = null;
    const id    = await dispatch('page/actFooterIntroduce');
    await Promise.all([
      dispatch('author/actFetchCurrentUser',token),
      dispatch('set',{data}),
      dispatch('page/actGetFooterIntroduce', id),
      dispatch('posts/actFetchAdminInf'),
      ]
    )
  },
  async actMainMenus({commit}) {
    try {
      const response = await this.$wpApi.get('/menus/v1/menus/main-menu');
      if (response.status === 200) {
        commit('setAppMainMenus', response.data);
      }

    } catch (e) {
    }
  },

  async actFetchLatestPost({commit}) {
    try {
      const response = await this.$api.get('/posts', {
        params: {
          page: 1,//trang hiện tại
          per_page: 4,//số bài viết trên 1 trang
        }
      });

      if (response.status === 200) {
        commit('setlatestList', response.data)
      }
      return {
        ok: true
      }
    } catch (e) {
    }
  },
  set({ commit }, { data }) {
    if (!data) {
      setOtherPageData(commit, this.$siteConfig)
    } else {
      commit('set', data)
    }
  }
}
function setOtherPageData(commit, siteConfig) {
  commit('set', {
    title: siteConfig.siteName,
    subtitle: siteConfig.tagline,
    url:siteConfig.url,
    featureImage:''
  })
}
