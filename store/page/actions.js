export default {
  async actGetHomeAbout ({commit,rootState},id){
    try{
      const response = await this.$api.get('/pages/'+id);
      if(response.status === 200 && response.data){
        commit('setPageListHome',response.data);
        return {
          ok : true,
          data : response.data
        }
      }
    }catch (e) {
      return {
        ok : false,
        error:e.message
      }
    }
  },
  async actGetFooterIntroduce ({commit,rootState},id){
    try{
      const response = await this.$api.get('/pages/'+id);
      if(response.status === 200 && response.data){
        commit('setPageListIntroduce',response.data);
        return {
          ok : true,
          data : response.data
        }
      }
    }catch (e) {
      return {
        ok : false,
        error:e.message
      }
    }
  },
  async actAboutMenus({dispatch}) {
    try {
      const response = await this.$wpApi.get('/menus/v1/menus/about-menu');
      if (response.status === 200) {
        return  response.data.items[0].object_id;

      }
    } catch (e) {
    }
  },
  async actGetPageAbout ({commit,rootState},id){
    try{
      const response = await this.$api.get('/pages/'+id);
      if(response.status === 200 && response.data){
        commit('setPageListAbout',response.data);
        return {
          ok : true,
          data : response.data
        }
      }
    }catch (e) {
      return {
        ok : false,
        error:e.message
      }
    }
  },
  async actHomeMenus({dispatch}) {
    try {
      const response = await this.$wpApi.get('/menus/v1/menus/Home-menu');
      if (response.status === 200) {
        return response.data.items[0].object_id;
      }
    } catch (e) {
    }
  },
  async actFooterIntroduce({dispatch}) {
    try {
      const response = await this.$wpApi.get('/menus/v1/menus/Footer-menu');
      if (response.status === 200) {
        return  response.data.items[0].object_id;
      }
    } catch (e) {
    }
  }
}
