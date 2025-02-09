import { DEFAULT_LOCAL_HOST, DEFAULT_MESSAGE_ERROR } from "@/components/constants"
import { iDeleteArticleResponse } from "@/types/articles/deleteArticle"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"



const initialState = {
  loading : false,
  data : {} as iDeleteArticleResponse,
  error : ""
}




export const deleteArticleFn = createAsyncThunk("articles/delete", async (articleId : number , {rejectWithValue}) => {
  try {
    const res = await axios.delete(`${DEFAULT_LOCAL_HOST}/articles/delete1/${articleId}`)
    return res.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message || DEFAULT_MESSAGE_ERROR)
    }
    return rejectWithValue (DEFAULT_MESSAGE_ERROR)
  }
})

export const deleteArticleSlice =  createSlice({
  name : "delete article slice",
  initialState,
  reducers : {},
  extraReducers (builder) {
     builder.addCase(deleteArticleFn.pending , (state) => {
        state.loading = true,
        state.data = {} as iDeleteArticleResponse,
        state.error = ""
        }),
        
        builder.addCase(deleteArticleFn.fulfilled , (state, action) => {
        state.loading = false,
        state.data = action.payload,
        state.error = ""
        }),
        
      builder.addCase(deleteArticleFn.rejected , (state, action) => {
        state.loading = false,
        state.data = {} as iDeleteArticleResponse,
        state.error = action.payload as string
        })
        
  }
})