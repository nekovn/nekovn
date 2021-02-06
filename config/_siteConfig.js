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
  introduce: 'ウェブサイトについて',
  tagline: '日本とベトナムとの相互交流、観光、文化などや最新情報を写真、画像、料理でまとめてお届けします',
  url:'https://neko-vn.jp',
  email:'nekovn2811@gmail.com',
  address:'東京都豊島区西池袋5-19-20',
  tell:'090 2259 2811',
  pageType:'website',
  image:'https://picsum.photos/1800/1803',
  about:'当サイト（https://neko-vn.jp）は、株式会社NekoVn が管理し、情報を提供しているウェブサイトです。当サイトを利用される前に以下の注意点をお読みいただき、ご了解いただいた上でご利用ください。利用者は、自らの判断と責任において、広告等を契機とした広告主などの第三者と連絡、交渉ないし取引その他の接触（以下「接触等」といいます。）をすることができます。当社は、利用者と第三者との間における接触等について、一切の関与をせず、かつ、責任を負いません。',
  author_main:'PHAM LE NGOC CUONG',
  featureImage: '/uploads/home-hero.jpg',
  userEmpty:'更新中',
  noPost:'現在、投稿はありません',
  contentSample:'ベトナムと日本の旅行や最新情報を写真、画像、料理でまとめてお届けします。ベトナム女性を気になっている人 ！ベトナム女性の性格と恋愛事情を紹介します。日本とベトナムとの相互交流、観光、文化などの交流が拡大され、信頼の関係を発展しています。',
  author:'admin',
  number:0,
  logo: 'logo-component', // 'logo-component', // or '/logo.svg' for regular image
  googleAnalytics: {
    on: true,
    id: process.env.GOOGLE_ANALYTICS_ID
  },
  mainMenu: [
    {
      name: '免責事項',
      link: '/about'
    },
    {
      name: 'お問い合わせ',
      link: '/contact'
    },
    {
      name: 'カテゴリー',
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
    successEmail :'メッセージを送信しました。最新の記事をお送りします。',
    title    : 'Nội dung được gửi từ NekoVn để nhận bài viết mới nhất',
    heading  : '最新の記事を受け取ります',
    btnText  : '送信',
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

