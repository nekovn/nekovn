export default function ({ store, redirect }) {
  // If the user is authenticated
  if (store.state.author.currentUser) {
    //neu user login then đẩy sang trang chủ
    return redirect('/')
  }
}
