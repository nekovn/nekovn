export  default {
  setCommentsList(state,{curPage, wpTotal, wpTotalPages, comments}){
    const data = {
      curPage,
      wpTotal,
      wpTotalPages,
      comments,
    }
    //if nhu curPage > 1 thi noi articles cu va articles moi lai voi nhau
    //cộng dồn article bài viết lại với nhau
    if(curPage > 1){
      data.comments = [
        ...state.commentsPaging.comments, // articles cu
        ...comments // articles moi
      ]
    }
    state.commentsPaging = data;
  },
  setCommentsReply(state,{curPage, wpTotal, wpTotalPages, comments,parentId}){
    const key = 'reply-parent-'+ parentId;
    const data = {
      curPage,
      wpTotal,
      wpTotalPages,
      commentsReply:comments,
    }
    //if nhu curPage > 1 thi noi articles cu va articles moi lai voi nhau
    //cộng dồn article bài viết lại với nhau
    if(curPage > 1){  // chưa lơn > 1 thì cho mãng data comments default
      data.commentsReply = [
        ...state.hashCommentsReplyPaging[key].commentsReply, // commentsReply cu
        ...data.commentsReply // commentsReply mới
      ]
    }
    if(
      state.hashCommentsReplyPaging[key] &&
      state.hashCommentsReplyPaging[key].curPage ===0
    ){
      data.commentsReply = [
        ...data.commentsReply,
        ...state.hashCommentsReplyPaging[key].commentsReply
      ]
    }
    state.hashCommentsReplyPaging = { // current 1  bắt đầu load thì gắn key  và data mới
      ...state.hashCommentsReplyPaging, // mãng cũ  ... nối với mãng mới
      [key]:data
    }
  },
  pushParentComments(state,newComment){
    state.commentsPaging = {
      ...state.commentsPaging, // coppy lai dữ liệu cũ
      comments: [
        ...state.commentsPaging.comments,// coppy lai dữ liệu cũ
        newComment
      ]
    }
  },
  increaseCommentReplyCount(state,parentId){
    let isFound = false;
    const newComments = state
      .commentsPaging
      .comments
      .map(cmt=>{
        if(cmt.id === parentId) {
          isFound = true;
          return {
            ...cmt,
            comment_reply_count:cmt.comment_reply_count + 1
          }
        }
        return  cmt;
      })
    if(isFound === true){
      state.commentsPaging = {
        ...state.commentsPaging,
        comments: newComments
      }
    }
  },
  pushReplyComments(state, {parentId,newComment}){
    const key = `reply-parent-${parentId}`
    if(state.hashCommentsReplyPaging[key]){
      //khi người dùng nhấp vào nút xem thêm bình luận
      const newCommentsReply = [
        ...state.hashCommentsReplyPaging[key].commentsReply,
        newComment
      ]
      state.hashCommentsReplyPaging ={
        ...state.hashCommentsReplyPaging,
        [key]:{
          ...state.hashCommentsReplyPaging[key],
          commentsReply:newCommentsReply
        }
      }

    }else { // khi ng dùng chưa ấn nút xem thêm bluan mà comment luôn
      state.hashCommentsReplyPaging = {
        ...state.hashCommentsReplyPaging,
        [key]:{
          commentsReply:[newComment],
          curPage:0,
          wpTotal:1,
          wpTotalPages:1
        }
      }
    }
  }
}
