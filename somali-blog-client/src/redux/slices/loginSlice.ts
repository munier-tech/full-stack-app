import { DEFAULT_LOCAL_HOST, DEFAULT_MESSAGE_ERROR } from "@/components/constants";
import { ILoginBody, ILoginResponse } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";


const data  =  localStorage.getItem("userLogin") ? JSON.parse(localStorage.getItem("userLogin")!) : {}

const initialState = {
   loading : false,
   data : (data as ILoginResponse) || ({} as ILoginResponse),
   error : ""
}

export const LoginFn = createAsyncThunk("auth/login", async (data : ILoginBody, {rejectWithValue}) => {
 try {
  const res = await axios.post(`${DEFAULT_LOCAL_HOST}/users/login`, data)
  return res.data
 } catch (error) {
  if (error instanceof AxiosError) {
    return rejectWithValue(error.response?.data.message || DEFAULT_MESSAGE_ERROR)
  }
  return rejectWithValue(DEFAULT_MESSAGE_ERROR )
 }
})


const loginSlice = createSlice({
  name : "login slice",
  initialState,
  reducers: {
    logOut : (state) => {
       state.data = {} as ILoginResponse,
       state.loading = false,
       state.error = ""
       localStorage.removeItem("userLogin")
    },
    removeLoginState : (state) => {
      state.data = {} as ILoginResponse,
      state.error = "",
      state.loading = false 
    }
  },
  extraReducers (builder) {
  builder.addCase(LoginFn.pending, (state) => {
   state.loading = true,
   state.data = {} as ILoginResponse,
   state.error = ""
  }),
  builder.addCase(LoginFn.fulfilled, (state, action) => {
    state.loading = false,
    state.data = action.payload,
    state.error = ""  
}),
builder.addCase(LoginFn.rejected, (state, action) => {
  state.loading = false,
  state.data = {} as ILoginResponse,
  state.error = action.payload as string  
})
}
})



export const { logOut, removeLoginState } = loginSlice.actions
export default loginSlice
