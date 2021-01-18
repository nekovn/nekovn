export default () => {
  return {
    latestList:[],
    userInf:[],
    adminInf:[],
    popularList:[],
    latestListByCategory:[],
    hashCategories:{},
    articlesPaging:{
      curPage :1,
      wpTotal :0,
      wpTotalPages:0,
      articles:[],
    },
    articlesPagingAuthor:{
      curPage :1,
      wpTotal :0,
      wpTotalPages:0,
      articles:[],
    },
    postDetail:null,
    relatedPosts:[],
    pendingPosts:[],
    draftPosts:[],
    otherPosts:[]

  }
}
