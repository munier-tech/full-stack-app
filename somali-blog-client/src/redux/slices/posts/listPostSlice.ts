import { DEFAULT_LOCAL_HOST, DEFAULT_MESSAGE_ERROR } from "@/components/constants";
import { iListPostResponse } from "@/types/posts/listPost";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";



const initialState = {
  loading :  false,
  data : {} as iListPostResponse,
  error : ""
}



export const listPostFn = createAsyncThunk("posts/create", async (_ ,{rejectWithValue}) => {

  try {
    const res = await axios.get(`${DEFAULT_LOCAL_HOST}/post/list` )
    return res.data
    
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message || DEFAULT_MESSAGE_ERROR)
    }
    return rejectWithValue(DEFAULT_MESSAGE_ERROR)
  }
})



export const ListPostSlice = createSlice({
  name : "list post slice",
  initialState,
  reducers : {},
  extraReducers (builder) {
  builder.addCase(listPostFn.pending, (state) => {
    state.loading = true,
    state.data = {} as iListPostResponse,
    state.error = ""
  }),
  builder.addCase(listPostFn.fulfilled, (state,action) => {
    state.loading = false,
    state.data = action.payload,
    state.error = ""
  }),
  builder.addCase(listPostFn.rejected, (state,action) => {
    state.loading = false,
    state.data = {} as iListPostResponse,
    state.error = action.payload as string
  })
  }
})



