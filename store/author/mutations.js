export default {
  setCurrentUser(state, {token, user,roles}) {
    console.log("roles:",roles)
      state.token = token;
      state.currentUser = user;
      state.roles = roles;
  },
  setPostCurrentUser(state,data) {
    state.listPost = data;
  }
}
