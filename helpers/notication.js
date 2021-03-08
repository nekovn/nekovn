//get  error notication
function notication_error (obj,description) {
  obj.$notification.error({
    message: 'Có lỗi xảy ra',
    description: description,
  });
}
//get  success notication
function notication_success (obj,description) {
  obj.$notification.success({
    message: 'Chúc mừng',
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
      notication_error(obj,'Vui lòng hãy nhập mã code đã gửi trong email của bạn!');
      break;
    case "The reset code provided is not valid. You have 2 attempts remaining.":
      notication_error(obj,'Mã code được cung cấp không hợp lệ. Bạn còn 2 lần thử !');
      break;
    case "The reset code provided is not valid. You have 1 attempts remaining.":
      notication_error(obj,'Mã code được cung cấp không hợp lệ. Bạn còn 1 lần thử !');
      break;
    case "You must request a password reset code before you try to set a new password.":
      notication_error(obj,'Bạn phải yêu cầu gửi lại mã code trước khi đặt lại mật khẩu mới !');
      obj.$router.push('/reset-password')
      break;
    case "The reset code provided is not valid. You have used the maximum number of attempts allowed. You must request a new code.":
      notication_error(obj,'Mã code được cung cấp không hợp lệ. Bạn đã sử dụng quá số lần thử được phép. Bạn phải yêu cầu một mã mới !');
      obj.$router.push('/reset-password')
      break;
    case "Unauthorized":
      notication_error(obj,'Bạn không có quyền truy cập vào trang này !');
      obj.$router.push('/')
      break;
    default:
      notication_error(obj,'Lấy lại mật khẩu thất bại ! Vui lòng kiểm tra lại thông tin email');
      obj.$router.push('/reset-password')
      break;

  }
}
//get switch error comment
function _switch_comment(obj,error){
  switch (error) {
    case "comment_duplicate":
      notication_error(obj,'Bình luận bị trùng,vui lòng kiểm tra lại!');
      break;
    case "comment_flood":
      notication_error(obj,'Nghi vấn spam,vui lòng bình luận lại!');
      break;
    default:
      notication_error(obj,'Vui lòng kiểm tra lại bình luận!');
      break;
  }
}
//get switch error password
function _switch (obj,error){
  switch (error) {
    case "rest_user_invalid_password":
      notication_error(obj,'Mật khẩu phải có ít nhất 1 ký tự số !');
      break;
    case "rest_user_invalid_password_empty":
      notication_error(obj,'Mật khẩu không được rỗng !');
      break;
    case "rest_user_invalid_password_flower":
      notication_error(obj,'Mật khẩu phải có ít nhất 1 ký tự in hoa !');
      break;
    case "rest_user_invalid_password_number":
      notication_error(obj,'Mật khẩu phải có ít nhất 1 ký tự số !');
      break;
    case "rest_user_invalid_password_backslash":
      notication_error(obj,"Mật khẩu không được có '\\' !");
      break;
    case "rest_user_invalid_password_space":
      notication_error(obj,'Mật khẩu không được có khoảng trắng !');
      break;
    case "existing_user_login":
      notication_error(obj,'Tên đăng nhập đã có người sử dụng !');
      break;
    case "rest_user_invalid_username":
      notication_error(obj,'Tên đăng nhập không phù hợp !');
      break;
    case "rest_user_invalid_empty":
      notication_error(obj,'Tên đăng nhập không được có khoảng trắng !');
      break;
    case "rest_user_invalid_dots":
      notication_error(obj,"Tên đăng nhập không được có dấu '.' !");
      break;
    case "rest_user_cannot_register":
      notication_error(obj,'Xin lỗi hiện tại bạn không thể đăng ký tài khoảng !');
      break;
    case "user_login_too_long":
      notication_error(obj,'Tên đăng nhập quá dài !');
      break;
    case "empty_user_login":
      notication_error(obj,'Tên đăng nhập không được rỗng !');
      break;
    case "invalid_user_id":
      notication_error(obj,'Tên đăng nhập không hợp lệ !');
      break;
    case "invalid_username":
      notication_error(obj,'Mật khẩu nhập lại không đúng !');
      break;
    case "user_nicename_too_long":
      notication_error(obj,'Tên biệt danh quá dài !');
      break;
    case "existing_user_email":
      notication_error(obj,'Email đã có người sử dụng !');
      break;
    case "no_spam":
      notication_error(obj,'Mật khẩu nhập lại không đúng !');
      break;
    case "rest_invalid_param":
      notication_error(obj,'Vui lòng hãy nhập thông tin !');
      break;
    case "rest_user_invalid_password_short":
      notication_error(obj,'Mật khẩu phải dài từ 3 đến 18 ký tự gồm chữ và số !');
      break;
    case "jwt_invalid":
      notication_error(obj,'Bạn không có quyền truy cập vào trang này !');
      obj.$router.push('/')
      break;
    default:
      notication_error(obj,'Vui lòng kiểm tra lại thông tin');
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
