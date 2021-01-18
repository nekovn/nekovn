export default {
  async actGetCategoryBySlug ({commit},{slug=''} = {} ){
    try{
      const response = await this.$api.get('/categories',{
        params:{
          slug
        }
      });
      if(response.status === 200 && response.data.length){
        return {
          ok : true,
          data : response.data[0]
        }
      }else{
        return {
          ok : false
        }
      }
    }catch (e) {
      return {
        ok : false
      }
    }
  },
  //categories
  async actFetchCategories({commit}) {
    try {
      const response = await this.$api.get('/categories');
      if (response.status === 200) {
        commit('setCategoriesListOfPost', response.data)
      }
      return {
        ok: true
      }
    } catch (e) {
    }
  },
}
