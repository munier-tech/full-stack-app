import { DEFAULT_LOCAL_HOST, DEFAULT_MESSAGE_ERROR } from "@/components/constants";
import { iArticleDetailResponse } from "@/types/articles/articleDetail";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";


const initialState = {
  loading : false,
  data : {} as iArticleDetailResponse ,
  error : ""
}


export const getArticleFn = createAsyncThunk("article/detail", async (articleId : number, {rejectWithValue}) => {
    try {
      const res = await axios.get(`${DEFAULT_LOCAL_HOST}/articles/details/${articleId}` )
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message || DEFAULT_MESSAGE_ERROR)
      }
      return rejectWithValue(DEFAULT_MESSAGE_ERROR)
    }
})



export const articleDetailSlice =  createSlice({
  name : "article detail",
  initialState,
  reducers : {},
  extraReducers (builder) {
    builder.addCase(getArticleFn.pending , (state) => {
       state.loading = true,
       state.data = {} as iArticleDetailResponse,
       state.error = ""
       }),
       
       builder.addCase(getArticleFn.fulfilled , (state, action) => {
       state.loading = false,
       state.data = action.payload,
       state.error = ""
       }),
       
     builder.addCase(getArticleFn.rejected , (state, action) => {
       state.loading = false,
       state.data = {} as iArticleDetailResponse,
       state.error = action.payload as string
       })
       
   
  }
})