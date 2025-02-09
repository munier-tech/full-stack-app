import { DEFAULT_LOCAL_HOST, DEFAULT_MESSAGE_ERROR } from "@/components/constants";
import { iCreataPostPayload, iCreatePostResponse } from "@/types/posts/posts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";



const initialState = {
  loading :  false,
  data : {} as iCreatePostResponse,
  error : ""
}



export const CreatePostFn = createAsyncThunk("posts/create", async (data : iCreataPostPayload, {rejectWithValue, getState}) => {
  const stateData : any = getState() 
  const token = stateData.Login.data.token
  try {
    const res = await axios.post(`${DEFAULT_LOCAL_HOST}/post/new`, data, {
      headers : {
         Authorization : `bearer ${token}`
      }
    }) 
    return res.data
    
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message || DEFAULT_MESSAGE_ERROR)
    }
    return rejectWithValue(DEFAULT_MESSAGE_ERROR)
  }
})



export const createPostSlice = createSlice({
  name : "create post slice",
  initialState,
  reducers : {
    removerPost (state) {
      state.loading = false,
      state.data = {} as iCreatePostResponse,
      state.error = ""
    }
  },
  extraReducers (builder) {
  builder.addCase(CreatePostFn.pending, (state) => {
    state.loading = true,
    state.data = {} as iCreatePostResponse,
    state.error = ""
  }),
  builder.addCase(CreatePostFn.fulfilled, (state,action) => {
    state.loading = false,
    state.data = action.payload,
    state.error = ""
  }),
  builder.addCase(CreatePostFn.rejected, (state,action) => {
    state.loading = false,
    state.data = {} as iCreatePostResponse,
    state.error = action.payload as string
  })
  }
})



export const { removerPost } = createPostSlice.actions