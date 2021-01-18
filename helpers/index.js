//ham đệ quy dùng khi lặp đi lặp lại code
import cookie from 'cookie'
function RecursiveMenuItems(item){
  const data = {
    id : item.ID,
    url: item.url,
    slug:item.slug,
    title:item.title,
    image:item.thumbnail_src,
    description:item.description,
  }
  let child_items = item.child_items;
  if(!child_items){
    data.child_items = [];
  }else{
    data.child_items = child_items.map(subItem=>{
      return RecursiveMenuItems(subItem);
    })
  }
  return data;
}
function mapPostCategories(hashCategories) {
  return post => { // map cho từng bài viết
    const listCategoriesId = post.categories;
    const listCategories = listCategoriesId.map(id => { // map ánh xạ cho categories
      return hashCategories[id]
    })
    return {
      ...post, // nối array post vào [0]=>obj
      categories: listCategories
    }
  }
}

//get value tooken
function getTokenFromCookie(request){
  try {
    const cookieString = request.headers.cookie;
    const cookieObj    = cookie.parse(cookieString);
    return cookieObj.access_token;

  }catch (e) {
    return ``
  }
}

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
function getFormattedDate (date){
  const months = [
    // 'January',
    // 'February',
    // 'March',
    // 'April',
    // 'May',
    // 'June',
    // 'July',
    // 'August',
    // 'September',
    // 'October',
    // 'November',
    // 'December',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12'

  ]
  const dateObj = new Date(date)
  return `${dateObj.getDate()}/${
    months[dateObj.getMonth()]
  }/${dateObj.getFullYear()}`
}

export {
  RecursiveMenuItems,
  mapPostCategories,
  getTokenFromCookie,
  deleteAllCookies,
  getFormattedDate,


}

