import { DEFAULT_LOCAL_HOST, DEFAULT_MESSAGE_ERROR } from "@/components/constants";
import { iCreateCommentBody, iCreateCommentPayload } from "@/types/comments/comments";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";



const initialState = {
  loading : false,
  data : {} as iCreateCommentPayload,
  error : ""
}



export const getCommentFn = createAsyncThunk("comment/create", async (data : iCreateCommentBody, {rejectWithValue, getState}) => {
   const dataState : any = getState()
   const { token } = dataState?.Login?.data 
   try {
      const res =  await axios.post(`${DEFAULT_LOCAL_HOST}/comment/create`, data , {
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



export const commentSlice =  createSlice({
  name : "create comment slice",
  initialState,
  reducers : {
    removeCommentFc : (state) => {
    state.data =  {} as iCreateCommentPayload,
    state.error = ""
    state.loading = false
    }
  },
  extraReducers (builder) {
    builder.addCase(getCommentFn.pending , (state) => {
       state.loading = true,
       state.data = {} as iCreateCommentPayload,
       state.error = ""
       }),
       
       builder.addCase(getCommentFn.fulfilled , (state, action) => {
       state.loading = false,
       state.data = action.payload,
       state.error = ""
       }),
       
     builder.addCase(getCommentFn.rejected , (state, action) => {
       state.loading = false,
       state.data = {} as iCreateCommentPayload,
       state.error = action.payload as string
       })
       
   
  }
})


export const { removeCommentFc } = commentSlice.actions