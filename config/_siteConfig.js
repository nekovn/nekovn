/**
 * CMS Configuration
 * Alter 'netlify' in the import statment below to one of the following:
 * netlify
 */

/**
 * General Site configurations
 */
export default {
  siteName: 'NekoVn',
  introduce: 'Giới thiệu',
  tagline: 'Chúng tôi sẽ cung cấp những thông tin mới nhất về du lịch,ngôn ngữ, văn hóa,và các món ăn... Nhật Bản.Giao lưu văn hóa giữa hai nước Việt Nam và Nhật Bản',
  url:'https://neko-vn.jp',
  email:'nekovn2811@gmail.com',
  address:'東京都豊島区西池袋5-19-20',
  tell:'090 2259 2811',
  pageType:'website',
  image:'https://picsum.photos/1800/1803',
  about:'Điều khoản Sử dụng quy định các điều khoản ràng buộc bạn khi sử dụng các Dịch vụ. Thuật ngữ “Bạn” và/hoặc “Người sử dụng” sau đây được gọi chung để chỉ tới những người sử dụng các Dịch vụ. Vui lòng nghiên cứu kỹ và lưu lại một bản Điều khoản Sử dụng này.\n' +
    '\n' +
    'Bằng việc ghé thăm website neko-vn.jp và sử dụng các Dịch vụ, Bạn đồng ý bị ràng buộc với Điều khoản Sử dụng này, Chính sách Quảng cáo và Chính sách Bảo mật của chúng tôi.\n' +
    '\n' +
    'Chúng tôi thực hiện Điều khoản Sử dụng này, Chính sách Quảng cáo và Chính sách bảo mật theo quy định của pháp luật hiện hành và không nội dung nào trong các tài liệu trên cản trở quyền của chúng tôi tuân thủ các quy định hoặc yêu cầu của chính phủ, tòa án, cơ quan thi hành án liên quan đến việc Bạn sử dụng các Dịch vụ hoặc thông tin do chúng tôi nhận được hoặc thu được từ việc sử dụng các Dịch vụ của Bạn.',
  author_main:'PHAM LE NGOC CUONG',
  featureImage: '/uploads/home-hero.jpg',
  featureLogo: '/uploads/neko-logo.png',
  userEmpty:'Updating',
  noPost:'Hiện tại,không có bài viết',
  contentSample:'NekoVn là trang văn hóa và cũng là cầu nối giữa văn hóa Việt-Nhật,thường xuyên cập nhật thông tin bổ ích về ẩm thực,văn hóa,du lịch nhật bản,từ vựng IT tiếng nhật và chia sẽ ngôn ngữ lập trình.',
  author:'admin',
  number:0,
  logo: 'logo-component', // 'logo-component', // or '/logo.svg' for regular image
  googleAnalytics: {
    on: true,
    id: process.env.GOOGLE_ANALYTICS_ID
  },
  mainMenu: [
    {
      name: 'Về NekoVn',
      link: '/about'
    },
    {
      name: 'Liên hệ',
      link: '/contact'
    },
    {
      name: 'Danh mục',
      link: '/categories'
    }
  ],
  hero: {
    theme: 'dark' // options: mist, light, dark
  },

  // Main Layout/Style
  layout: {
    width: 'contained', // Options: contained, full
    theme: 'one-column' // Options: one-column, sidebar-right, sidebar-left
  },

  // Card Layout
  cards: {
    imageDimensions: '2x1', // Options: 1x1, 5x4, 4x3, 3x2, 5x3, 16x9, 2x1, 3x1, 4x5, 3x4, 2x3, 3x5, 9x16
    theme: 'boxes' // Options: boxes, grid, image-grid
  },

  // Disqus
  disqus: {
    on: true,
    loadingStrategy: 'button', // Options: onload, lazy, button
    siteShortName: 'blog-danielkelly-io' // 'blog-danielkelly-io'
  },

  // Newsletter Subscribe
  newsletter: {
    on: true,
    introduce:'GIỚI THIỆU',
    siteName : 'Khách hàng',
    successEmail :'Tin nhắn đã được gửi.Chúng tôi sẽ gửi cho bạn bài viết mới nhất',
    title    : 'Nội dung được gửi từ NekoVn để nhận bài viết mới nhất',
    heading  : 'Nhận các bài viết mới nhất',
    btnText  : 'Gửi',
    // Can be the form action on a mail chimp form, a hubspot form,
    // or any other url you want to post the form data to
    mailchimp: {
      on: true,
      email:'nekovn2811@gmail.com',
    },
    custom: {
      on: false,
      formAction: ''
    }
  },

  // Categories
  categories: {
    on: true,
    perPage: 6,
    imageDimensions: null, // See card.imageDimensions (can be unique for categories if set here)
    theme: null // See card.theme (can be unique for categories if set here)
  },

  // Posts
  posts: {
    on: true,
    theme: null, // See card.theme (can be unique for posts if set here)
    imageDimensions: null, // See card.imageDimensions (can be unique for posts if set here)
    displayAuthor: true,
    date: {
      display: true
    },
    perRow: 3,
    perPage: 6
  }
}

