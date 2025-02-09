import { configureStore } from "@reduxjs/toolkit"
import loginSlice from "./slices/loginSlice"
import registerSlice from "./slices/registerSlice"
import articleSlice from "./slices/articles/articleSlice"
import { listArticelsSlice } from "./slices/articles/listArticleSlice"
import { articleDetailSlice } from "./slices/articles/articleDetailSlice"
import { deleteArticleSlice } from "./slices/articles/deleteArticleSlice"
import { commentSlice } from "./slices/comment/commentSlice"
import { ArticleCommentSlice } from "./slices/comment/listCommentsSLice"
import { deleteCommentSlice } from "./slices/comment/deleteCommentSlice"
import { createPostSlice } from "./slices/posts/postslice"
import { ListPostSlice } from "./slices/posts/listPostSlice"



const store = configureStore({
  reducer : {
    Login : loginSlice.reducer,
    register : registerSlice.reducer,
    article : articleSlice.reducer,
    listArticelsSlice : listArticelsSlice.reducer,
    articleDetailSlice : articleDetailSlice.reducer,
    deleteArticleSlice : deleteArticleSlice.reducer,
    commentSlice : commentSlice.reducer,
    ArticleCommentSlice : ArticleCommentSlice.reducer,
    deleteCommentSlice : deleteCommentSlice.reducer,
    createPostSlice : createPostSlice.reducer,
    ListPostSlice : ListPostSlice.reducer
  },
  devTools : true
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export default store