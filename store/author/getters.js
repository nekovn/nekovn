export default {

  isLogin(authState) {
    if (authState.currentUser){
      return  true;
    }
    return  false;
  },
  isAdmin(authState) {
    if (authState.currentUser && authState.roles ==='administrator'){
      return  true;
    }
    return  false;
  },
  isEditor(authState) {
    if (authState.currentUser && authState.roles==='editor'){
      return  true;
    }
    return  false;
  },
  isAuthor(authState) {
    if (authState.currentUser && authState.roles ==='author'){
      return  true;
    }
    return  false;
  },
  avatar(authState){
    if(!authState.currentUser){
      return  '';
    }
    if(authState.currentUser.simple_local_avatar){
      return  authState.currentUser.simple_local_avatar.full;
    }

    const userId = authState.currentUser.id;
    return `/assets/images/avatar${userId % 4 + 1}.jpg`;
  }


}
