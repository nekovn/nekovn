export default {
  setlatestList(state, data) {
    state.latestList = data;
  },
  setUserInf(state, data) {
    state.userInf = data;
  },
  setAdminInf(state, data) {
    state.adminInf = data;
  },
  setPopularList(state, data) {
    state.popularList = data;
  },
  setCategoriesList(state, categories) {
    let hashCategories = {};
    categories.forEach((category) => {
      //chay vòng lặp categories và  category là 1 obj
      const categoryId = category.id;
      hashCategories[categoryId] = category;
    })
    state.hashCategories = hashCategories;
  },
  setArticlesList(state, {curPage, wpTotal, wpTotalPages, articles}) {
    const data = {
      curPage,
      wpTotal,
      wpTotalPages,
      articles,
    }
    //if nhu curPage > 1 thi noi articles cu va articles moi lai voi nhau
    //cộng dồn article bài viết lại với nhau
    if (curPage > 1) {
      data.articles = [
        ...state.articlesPaging.articles, // articles cu
        ...articles // articles moi
      ]
    }
    state.articlesPaging = data;
  },
  setArticlesAuthor(state, {curPage, wpTotal, wpTotalPages, articles}) {
    const data = {
      curPage,
      wpTotal,
      wpTotalPages,
      articles,
    }
    //if nhu curPage > 1 thi noi articles cu va articles moi lai voi nhau
    //cộng dồn article bài viết lại với nhau
    if (curPage > 1) {
      data.articles = [
        ...state.articlesPagingAuthor.articles, // articles cu
        ...articles // articles moi
      ]
    }
    state.articlesPagingAuthor = data;
  },

  setPostDetail(state, data) {
    state.postDetail = data;
  },
  setRelatedPosts(state, data) {
    state.relatedPosts = data;
  },
  setPendingPosts(state, data) {
    state.pendingPosts = data;
  },
  setPendingDraft(state, data) {
    state.draftPosts = data;
  },
  setOtherPosts(state, data) {
    state.otherPosts = data;
  },
  setRelatedPostsByCategory(state, data) {
    state.latestListByCategory = data;
  },
  increaseCommentCount(postsState) {
    if (postsState.postDetail) {
      postsState.postDetail = {
        ...postsState.postDetail,//coppy lại dữ liệu cũ
        comment_count: postsState.postDetail.comment_count + 1
      }
    }
  }

}
