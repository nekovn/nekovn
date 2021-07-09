export default {
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
  //popular
  async actFetchPopularPost({commit}) {
    try {
      const response = await this.$api.get('/posts', {
        params: {
          page: 1,//trang hiện tại
          per_page: 15,//số bài viết trên 1 trang
          orderby: 'post_views'
        }
      });
      if (response.status === 200) {
        commit('setPopularList', response.data)
      }
      return {
        ok: true
      }
    } catch (e) {
    }
  },
  //categories
  async actFetchCategories({commit}) {
    try {
      const response = await this.$api.get('/categories', {
        params: {
          page: 1,//trang hiện tại
          per_page: 10,//số bài viết trên 1 trang
        }
      });
      if (response.status === 200) {
        commit('setCategoriesList', response.data)
      }
      return {
        ok: true
      }
    } catch (e) {
    }
  },
  //pagination and list articles
  async actFetchArticlesList({commit}, {curPage = 1, pageSize = 2, ...restParams} = {}) {
    //restParams : khi ta ko truyen vao la no 1 obj params rong con truyen vào nó tự gộp chung vào obj params
    try {
      const response = await this.$api.get('/posts', {
        params: {
          page: curPage,
          per_page: pageSize,
          ...restParams
        }
      });
      if (response.status === 200) {
        const header = response.headers;
        const wpTotal = parseInt(header['x-wp-total']);
        const wpTotalPages = parseInt(header['x-wp-totalpages']);
        const data = {
          curPage,
          wpTotal,
          wpTotalPages,
          articles: response.data
        }
        commit('setArticlesList', data);
      }

    } catch (e) {
    }
  },
  //action aticle by author id no get page
  async actFetchArticlesByUser({commit}, {author} = {}) {
    try {
      const response = await this.$api.get('/posts', {
        params: {
          author: author
        }
      });
      if (response.status === 200 && response.data.length) {
        commit('setRelatedPosts', response.data)
      }
    } catch (e) {
    }
  },
  //action aticle pending by author id
  async actArticlesPendingByUser({commit}, {author} = {}) {
    try {
      const response = await this.$api.get('/posts/pending', {
        params: {
          author: author
        }
      });
      if (response.status === 200) {
        commit('setPendingPosts', response.data.pending)
      }
    } catch (e) {
    }
  },
  //action aticle draft by author id
  async actArticlesDraftByUser({commit}, {author} = {}) {
    try {
      const response = await this.$api.get('/posts/message', {
        params: {
          author: author
        }
      });
      if (response.status === 200) {
        commit('setPendingDraft', response.data.message)
      }
    } catch (e) {
    }
  },
  //action aticle other by author id
  async actFetchArticlesOtherByUser({commit}, {author} = {}) {
    try {
      const response = await this.$api.get('/post/other', {
        params: {
          author: author
        }
      });
      if (response.status === 200) {
        commit('setOtherPosts', response.data.result)
      }
    } catch (e) {
    }
  },
  //action aticle by author id
  async actFetchArticlesByAuthor({commit}, {curPage = 1, pageSize = 2, author} = {}) {
    //restParams : khi ta ko truyen vao la no 1 obj params rong con truyen vào nó tự gộp chung vào obj params
    try {
      const response = await this.$api.get('/posts', {
        params: {
          page: curPage,
          per_page: pageSize,
          author: author
        }
      });
      if (response.status === 200 && response.data.length) {
        const post = response.data[0];
        const header = response.headers;
        const wpTotal = parseInt(header['x-wp-total']);
        const wpTotalPages = parseInt(header['x-wp-totalpages']);
        const data = {
          curPage,
          wpTotal,
          wpTotalPages,
          articles: response.data
        }
        await Promise.all([
          commit('setArticlesAuthor', data),
        ])
        return {
          ok: true,
          post
        }
      } else {
        return {
          ok: false
        }
      }
    } catch (e) {
      return {
        ok: false
      }
    }
  },
  //action aticle by slug
  async actFetchArticleBySlug({commit}, {slug}) {
    try {
      const response = await this.$api.get('/posts', {
        params: {
          slug
        }
      })
      if (response.status === 200 && response.data.length) {
        const post = response.data[0];
        commit('setPostDetail', post);
        return {
          ok: true,
          post
        }
      } else {
        return {
          ok: false
        }
      }
    } catch (e) {
      return {
        ok: false
      }
    }
  },
  //action relatedPosts by author id
  async actFetchRelatedPosts({commit}, {authorId}) {
    try {
      const response = await this.$api.get('/posts', {
        params: {
          page: 1,
          per_page: 10,
          author: [authorId]
        }
      });
      if (response.status === 200 && response.data.length) {
        commit('setRelatedPosts', response.data);
      }
    } catch (e) {
    }
  },
  //action relatedPosts by category
  //pthuc get thi moi truyen dc params
  async actFetchRelatedPostsByCategory({commit}, {post}) {
    try {
      const response = await this.$api.get('/post/related', {
        params: {
          post_id: post
        }
      });
      if (response.data.length) {
        commit('setRelatedPostsByCategory', response.data);
        return {
          data: response.data
        }
      } else {
        commit('setRelatedPostsByCategory', []);
      }
    } catch (e) {
    }
  },
  //get information of user
  async actFetchUserInf({commit}, {user_id}) {
    try {
      const response = await this.$api.get('/users/inf', {
        params: {
          user_id: user_id
        }
      })
      console.log("actFetchUserInf:",response)
      if (response.data.status === 200 && response.data.result.roles) {
        commit('setUserInf', response.data.result);
        return {
          ok: true
        }
      } else {
        return {
          ok: false
        }
      }
    } catch (e) {
      return {
        ok: false
      }
    }
  },
  //get information of admin
  async actFetchAdminInf({commit}) {
    try {
      const response = await this.$api.get('/admin/inf')
      if (response.data.status === 200) {
        commit('setAdminInf', response.data.result);
      }
    } catch (e) {

    }
  },

}
