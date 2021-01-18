//get  error notication
function notication_error (obj,description) {
  obj.$notification.error({
    message: 'エラーが発生しました',
    description: description,
  });
}
//get  success notication
function notication_success (obj,description) {
  obj.$notification.success({
    message: '完成',
    description: description,
  });
}
//get load icon
function getLoadIcon(obj,time) {
  obj.setLoading(true);
  setTimeout(() => {
    //  xóa loading sau 1s
    obj.setLoading(false);
  }, time);
};
//get switch error code number
function  _switch_code(obj,message){
  switch (message) {
    case "You must provide a code.":
      notication_error(obj,'メールで送信されたコードを入力してください !');
      break;
    case "The reset code provided is not valid. You have 2 attempts remaining.":
      notication_error(obj,'指定されたコードは無効です。 残り2回の試行があります !');
      break;
    case "The reset code provided is not valid. You have 1 attempts remaining.":
      notication_error(obj,'指定されたコードは無効です。 残り1回の試行があります !');
      break;
    case "You must request a password reset code before you try to set a new password.":
      notication_error(obj,'パスワードをリセットする前に、コードの再送信をリクエストする必要があります !');
      obj.$router.push('/reset-password')
      break;
    case "The reset code provided is not valid. You have used the maximum number of attempts allowed. You must request a new code.":
      notication_error(obj,'指定されたコードは無効です。 許可された回数を超えて使用しました。 新しいコードをリクエストする必要があります !');
      obj.$router.push('/reset-password')
      break;
    case "Unauthorized":
      notication_error(obj,'このページにアクセスする権限がありません !');
      obj.$router.push('/')
      break;
    default:
      notication_error(obj,'取得したパスワードが失敗しました！ メール情報をご確認ください !');
      obj.$router.push('/reset-password')
      break;

  }
}
//get switch error comment
function _switch_comment(obj,error){
  switch (error) {
    case "comment_duplicate":
      notication_error(obj,'コメントが重複しています。もう一度確認してください !');
      break;
    case "comment_flood":
      notication_error(obj,'スパム禁止、もう一度コメントしてください !');
      break;
    default:
      notication_error(obj,'コメントをもう一度確認してください !');
      break;
  }
}
//get switch error password
function _switch (obj,error){
  switch (error) {
    case "rest_user_invalid_password":
      notication_error(obj,'パスワードは1文字以上である必要があります !');
      break;
    case "rest_user_invalid_password_empty":
      notication_error(obj,'パスワードを入力してください !');
      break;
    case "rest_user_invalid_password_flower":
      notication_error(obj,'パスワードには少なくとも1つの大文字が含まれている必要があります !');
      break;
    case "rest_user_invalid_password_number":
      notication_error(obj,'パスワードには少なくとも1つの数字が含まれている必要があります !');
      break;
    case "rest_user_invalid_password_backslash":
      notication_error(obj,"パスワードに'\\'を含めることはできません !");
      break;
    case "rest_user_invalid_password_space":
      notication_error(obj,'パスワードにスペースができません !');
      break;
    case "existing_user_login":
      notication_error(obj,'すでに使用中のユーザー名 !');
      break;
    case "rest_user_invalid_username":
      notication_error(obj,'ユーザー名ができません !');
      break;
    case "rest_user_invalid_empty":
      notication_error(obj,'ユーザー名にスペースを含めることはできません !');
      break;
    case "rest_user_invalid_dots":
      notication_error(obj,"ユーザー名に'.'を含めることはできません !");
      break;
    case "rest_user_cannot_register":
      notication_error(obj,'申し訳ありませんが、現在アカウントを登録することはできません !');
      break;
    case "user_login_too_long":
      notication_error(obj,'ユーザー名が長すぎます !');
      break;
    case "empty_user_login":
      notication_error(obj,'ユーザー名を空にすることはできません !');
      break;
    case "invalid_user_id":
      notication_error(obj,'ユーザー名は有効ではありません !');
      break;
    case "invalid_username":
      notication_error(obj,'パスワードが一致しません　!');
      break;
    case "user_nicename_too_long":
      notication_error(obj,'ニックネームが長すぎる !');
      break;
    case "existing_user_email":
      notication_error(obj,'メールは既に使用されています !');
      break;
    case "no_spam":
      notication_error(obj,'スパム禁止 !');
      break;
    case "rest_invalid_param":
      notication_error(obj,'あなたの情報を入力してください!');
      break;
    case "rest_user_invalid_password_short":
      notication_error(obj,'パスワードは、文字と数字を含めて3〜18文字の長さである必要があります !');
      break;
    case "jwt_invalid":
      notication_error(obj,'このページにアクセスする権限がありません !');
      obj.$router.push('/')
      break;
    default:
      notication_error(obj,'あなたの情報を確認してください');
      break;

  }
}

export {
  notication_error,
  notication_success,
  _switch,
  _switch_code,
  _switch_comment,
  getLoadIcon
}
