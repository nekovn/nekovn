export default function ({ store, redirect }) {
  // If the user is authenticated
  if (!store.state.author.currentUser) {
    //neu user chưa login thì đẩy sang home
     return redirect('/login')
  }
}
