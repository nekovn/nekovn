import {mapPostCategories} from '@/helpers'
export default {
  getPopularList(postState) {
    const popularList = postState.popularList;
    const hashCategories = postState.hashCategories;

    return popularList.map(mapPostCategories(hashCategories))
  },
  getArticleList(postState) {
    const hashCategories = postState.hashCategories;
    return postState.articlesPaging.articles.map(mapPostCategories(hashCategories))
  },
  getPostDetail(postState){
    return postState.postDetail
  },
  getPostView(postState){
    return postState.popularList
  },
  getPostLatest(postState){
    return postState.latestList
  },
  getPostOther(postState){
    return postState.otherPosts
  },
  getRelatedPostByCategory(postState){
    return postState.latestListByCategory
  },
  getUserInf(postState){
    return postState.userInf
  },
  getWpTotalPages(postState){
    return postState.articlesPagingAuthor.wpTotalPages
  },
  getCurrentPage(postState){
    return postState.articlesPagingAuthor.curPage
  },
  getArticles(postState){
    return postState.articlesPagingAuthor.articles
  },
  getAdminInf(postState){
    return postState.adminInf
  }
}
