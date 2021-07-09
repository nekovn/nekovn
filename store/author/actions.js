import {deleteAllCookies} from '@/helpers'

export default {
  //  delete post
  async actDeletePost({state}, post) {
    try {
      const token = state.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      const response = await this.$api.delete('/posts/'+post,config);
      return {
        ok: true
      }
    } catch (e) {
      return {
        ok: false,
        error: e.message
      }
    }
  },
  //GetArticleByIdPostUser
  async actGetPostById({state, commit}, post) {
    try {
      const token = state.token;
      const response = await this.$api.get('/posts/' + post, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      commit('setPostCurrentUser', response.data);
      return {
        ok: true
      }
    } catch (e) {
      return {
        ok: false,
        error: e.message
      }
    }
  },
  async actFetchCurrentUser({commit}, token) {
    try {
      const response = await this.$api.get('/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("response:",response)
      if (response.status === 200 && response.data) {
        commit('setCurrentUser', {
          token,
          user: response.data,
          roles:response.data.roles[0]
        })
      }
    } catch (e) {
      return {
        ok: false,
        error: e.message
      }
    }
  },

  async actLogin({dispatch}, {username, password}) {
    try {
      const response = await this.$wpApi.post('/jwt-auth/v1/token', {
        username,
        password
      });

      if (response.status === 200 && response.data) {
        //gắn token vào cookie
        //exdays: số ngày cho đến khi cookie hết hạn (2d)
        var d = new Date();
        d.setTime(d.getTime() + (2 * 24 * 60 * 60 * 1000));
        document.cookie = `access_token=${response.data.token};expires=${d.toUTCString()}`;
        dispatch('actFetchCurrentUser', response.data.token)
        return {
          ok: true
        }
      }
      return {
        ok: false,
        error: response.message
      }
    } catch (e) {
      //có 2 loại lỗi
      //1.Loi cu pháp , loi login trong vuejs,javascript
      //2.loi response tu server 40x,50x
      if (e.response && e.response.data) {
        return {
          ok: false,
          error: e.response.data.message
        }
      }
      return {
        ok: false,
        error: e.message
      }
    }
  },

  async actRegister({dispatch}, {username, password, email, nickname}) {

    try {
      const response = await this.$api.post('/users/register', {
        username,
        password,
        email,
        nickname
      });
      if (response.status === 201 && response.data) {
        return await dispatch('actLogin', {username, password})
      }
    } catch (e) {
      //có 2 loại lỗi
      //1.Loi cu pháp , loi login trong vuejs,javascript
      //2.loi response tu server 40x,50x
      if (e.response && e.response.data) {
        return {
          ok: false,
          error: e.response.data.code
        }
      }
      return {
        ok: false,
        error: e.message
      }
    }
  },

  actLogout({commit}) {
    deleteAllCookies();
    commit('setCurrentUser', {
      token: '',
      user: null
    })

  },
  actResetCurrentUser({commit}) {
    deleteAllCookies();
    commit('setCurrentUser', {
      token: '',
      user: null
    })

  },

  async actUpdatePostOfUser({state, dispatch}, {post_title, post_category, post_content, post_author,post_name, file}) {
    try {
      const result = await dispatch('actUploadAvatar', {file});
      if (!result.ok) {
        //nếu upload ko thành công
        return {
          ok: false,
          error: result.error
        }
      }
      const image_url = result.data.source_url;
      const response = await this.$api.post('/users/post', {
        post_title,
        post_category,
        post_content,
        post_author,
        post_name,
        image_url
      });

      return {
        ok: response.data.updated
      }
    } catch (e) {
    }
  },
  async actEditPostOfUser({state, dispatch}, data) {
    try {
      const token = state.token;
      let media_url = ''; // neu media co gia tri thi lay <=> thi lay url cũ
      let media_id = '';
      if (data.file) {
        const result = await dispatch('actUploadAvatar', {file: data.file});
        if (!result.ok) {
          //nếu upload ko thành công
          return {
            ok: false,
            error: result.error
          }
        }
        media_url = result.data.source_url;
        media_id = result.data.id;
      } else {
        media_url = state.listPost.featured_media_url;
        media_id = state.listPost.featured_media;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      const params = {
        title: data.title,
        slug: data.slug,
        featured_media: media_id,
        featured_media_url: media_url,
        content: data.content,
        categories: data.categories,
      }
      await this.$api.post('/posts/' + data.id, params, config);
      return {
        ok: true
      }
    } catch (e) {
    }
  },
  async actUploadAvatar({state}, {file}) {
    try {
      const token = state.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        }
      }
      const formData = new FormData();//upload file thi dung formData de goi api
      formData.append('file', file);
      const response = await this.$api.post('/media', formData, config);
      return {
        ok: true,
        data: response.data
      }
    } catch (e) {
      return {
        ok: false,
        error: e.message
      }
    }
  },

  async actUpdateProfile({commit, dispatch, state}, {
    file,
    nickname,
    last_name,
    first_name,
    description,
    url
  }) {
    try {
      const token = state.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      const data = {
        nickname,
        last_name,
        first_name,
        description,
        url
      }
      if (file) {
        const resMedia = await dispatch('actUploadAvatar', {file});
        //phải chờ api actUploadAvatar chạy xong nên dùng await
        if (!resMedia.ok) {
          //nếu upload ko thành công
          return {
            ok: false,
            error: resMedia.error
          }
        }
        //  nếu thành công thì gắn thêm simple_local_avatar với media_id
        data.simple_local_avatar = {
          media_id: resMedia.data.id
        }
      }
      const resUser = await this.$api.put('/users/me', data, config);
      const user = resUser.data;
      commit('setCurrentUser', {token, user});

      return {
        ok: true,
        data: user
      }

    } catch (e) {
      if (e.response) {
        return {
          ok: false,
          error: e.response.data.message
        }
      }
      return {
        ok: false,
        error: e.message
      }
    }

  },
  async actContactForm({commit, dispatch, state}, {
    yourName,
    yourEmail,
    subject,
    message
  }) {
    try {
      // const token = state.token;
      const config = {
        headers: {
          // Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        }
      }
      const data = {
        'your-name': yourName,
        'your-email': yourEmail,
        'your-subject': subject,
        'your-message': message
      }
      // Create a FormData object, and append each field to the object
      const form = new FormData();
      for (const field in data) {
        form.append(field, data[field]);
      }
      const resContact = await this.$wpApiContact.post('/contact-forms/66/feedback', form, config);
      return {
        ok: true,
        message: resContact.data.message
      }
    } catch (e) {
      return {
        ok: false,
        error: e.message
      }
    }
  },
  async actChangePassword({state}, {password, new_password, confirm_new_password}) {
    try {
      const data = {
        password,
        new_password,
        confirm_new_password
      }
      const token = state.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await this.$api.put('/users/password', data, config);
      return {
        ok: true
      }
    } catch (e) {
      if (e.response) {
        return {
          ok: false,
          error: e.response.data.message
        }
      }
      return {
        ok: false,
        error: e.message
      }
    }
  },

  async actResetPassword({state}, {email}) {
    try {
      const data = {
        email,
      }

      const response = await this.$api.post('/reset-password', data);
      return {
        ok: true
      }
    } catch (e) {
      if (e.response) {
        return {
          ok: false,
          error: e.response.data.message
        }
      }
      return {
        ok: false,
        error: e.message
      }
    }
  },
  async actSetNewPassword({state}, {email, code, password}) {
    try {
      const data = {
        email,
        code,
        password
      }
      const response = await this.$api.post('/set-password', data);
      return {
        ok: true
      }
    } catch (e) {
      if (e.response) {
        return {
          ok: false,
          error: e.response.data
        }
      }
      return {
        ok: false,
        error: e.message
      }
    }
  },

  async actCheckNewPassword({state}, {new_password, confirm_new_password}) {
    try {
      const data = {
        new_password,
        confirm_new_password
      }
      const response = await this.$api.put('/users/reset-password', data);
      return {
        ok: true,
        password: response.data.password
      }
    } catch (e) {
      if (e.response) {
        return {
          ok: false,
          error: e.response.data
        }
      }
      return {
        ok: false,
        error: e.message
      }
    }
  }
}
