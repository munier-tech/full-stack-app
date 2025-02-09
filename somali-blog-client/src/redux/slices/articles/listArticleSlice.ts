import { DEFAULT_LOCAL_HOST, DEFAULT_MESSAGE_ERROR } from "@/components/constants";
import { iListArticleResponse } from "@/types/articles/listArticles";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";



const initialState = {
  loading : false,
  data : {} as iListArticleResponse,
  error : ""
}




export const listArticlesFn = createAsyncThunk("articles/list", async (__, {rejectWithValue}) => {
  try {
    const res =  await axios.get(`${DEFAULT_LOCAL_HOST}/articles/list`)
    return res.data
  } catch (error) {
    if (error instanceof AxiosError) {
  return rejectWithValue(error.response?.data.message || DEFAULT_MESSAGE_ERROR)
    }
    return rejectWithValue(DEFAULT_MESSAGE_ERROR)
  }
})




export const listArticelsSlice = createSlice({
  name : "list articles slice",
  initialState,
  reducers : {},
  extraReducers (builder) {
   builder.addCase(listArticlesFn.pending , (state) => {
    state.loading = true,
    state.data = {} as iListArticleResponse,
    state.error = ""
   }),
   builder.addCase(listArticlesFn.fulfilled , (state, action) => {
    state.loading = false,
    state.data = action.payload
    state.error = ""
   }),
   builder.addCase(listArticlesFn.rejected , (state, action) => {
    state.loading = false,
    state.data = {} as iListArticleResponse
    state.error = action.payload as string
   })
  }
})


