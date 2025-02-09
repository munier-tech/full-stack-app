import { DEFAULT_LOCAL_HOST, DEFAULT_MESSAGE_ERROR } from "@/components/constants";
import { iArticleCommentResponse } from "@/types/comments/articlecomments";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";



const initialState = {
  loading : false,
  data : {} as iArticleCommentResponse,
  error : ""
}

export interface IArticleCommentsPayload {
  articleId : number;
  page : number;
  size : number
}

export const getArticleCommentFn = createAsyncThunk("article/comments" , async (data : IArticleCommentsPayload, {rejectWithValue}) => {
 try {
  const res = await axios.get(`${DEFAULT_LOCAL_HOST}/comment/article/${data.articleId}?page=${data.page}&size=${data.size}`)
  return res.data
 } catch (error) {
  if (error instanceof AxiosError) {
    return rejectWithValue(error.response?.data.message || DEFAULT_MESSAGE_ERROR)
  }
  return rejectWithValue(DEFAULT_MESSAGE_ERROR)
 }
})


export const ArticleCommentSlice =  createSlice({
  name : "article comment slice",
  initialState,
  reducers : {
    removeCommentFc : (state) => {
    state.data =  {} as iArticleCommentResponse, 
    state.error = ""
    state.loading = false
    }
  },
  extraReducers (builder) {
    builder.addCase(getArticleCommentFn.pending , (state) => {
       state.loading = true,
       state.data = {} as iArticleCommentResponse,
       state.error = ""
       }),
       
       builder.addCase(getArticleCommentFn.fulfilled , (state, action) => {
       state.loading = false,
       state.data = action.payload,
       state.error = ""
       }),
       
     builder.addCase(getArticleCommentFn.rejected , (state, action) => {
       state.loading = false,
       state.data = {} as iArticleCommentResponse,
       state.error = action.payload as string
       })
       
   
  }
})


