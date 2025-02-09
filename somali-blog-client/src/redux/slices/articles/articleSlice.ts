import { DEFAULT_LOCAL_HOST, DEFAULT_MESSAGE_ERROR } from "@/components/constants"
import { iCreateArticlePayload, iCreateArticleResponse } from "@/types/articles/articles"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"



const initialState = {
  loading : false,
  data : {} as iCreateArticleResponse,
  error : ""
}



export const createArticleThunk = createAsyncThunk("articles/create", async(data : iCreateArticlePayload , {rejectWithValue, getState}) => {
  const stateData : any = getState();
   const token = stateData?.Login?.data?.token
  try {
    const res = await axios.post(`${DEFAULT_LOCAL_HOST}/articles/new`, data, {
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




const articleSlice = createSlice({
   name : "articles slice",
   initialState,
   reducers : {
    removeExistedArticle : (state) => {
     state.loading = false,
     state.data = {} as iCreateArticleResponse,
     state.error = ""
    }
   },
   extraReducers (builder) {
    builder.addCase(createArticleThunk.pending , (state) => {
    state.loading = true,
    state.data = {} as iCreateArticleResponse,
    state.error = ""
    }),
    
    builder.addCase(createArticleThunk.fulfilled , (state, action) => {
    state.loading = false,
    state.data = action.payload,
    state.error = ""
    }),
    
  builder.addCase(createArticleThunk.rejected , (state, action) => {
    state.loading = false,
    state.data = {} as iCreateArticleResponse,
    state.error = action.payload as string
    })
    

   }
})


export const { removeExistedArticle } = articleSlice.actions

export default  articleSlice