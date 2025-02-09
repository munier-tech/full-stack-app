import { DEFAULT_LOCAL_HOST, DEFAULT_MESSAGE_ERROR } from "@/components/constants";
import {  iRegisterBody, iRegisterResponse } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
const data = localStorage.getItem('registerstate') ? JSON.parse(localStorage.getItem('registerstate')!) : {}

const initialState = {
  loading : false,
  data : (data as iRegisterResponse) ||  ({} as iRegisterResponse),
  error : ""
}


export const RegisterFn = createAsyncThunk(
  "auth/register",
  async (data: iRegisterBody, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${DEFAULT_LOCAL_HOST}/users/new`, data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message || DEFAULT_MESSAGE_ERROR);
      }
      return rejectWithValue(DEFAULT_MESSAGE_ERROR);
    }
  }
);




const registerSlice = createSlice({
  name : "register slice",
  initialState,
  reducers: {
    clearRegisterState: (state) => {
      state.data = {} as iRegisterResponse;
      state.error = "";
      state.loading = false;
    },
  },
  extraReducers (builder) {
   builder.addCase(RegisterFn.pending, (state) => {
   state.loading = true,
   state.data = {} as iRegisterResponse,
   state.error = ""
   }),
   builder.addCase(RegisterFn.fulfilled, (state, action) => {
    state.loading = false,
    state.data = action.payload,
    state.error = ""
    }),
    builder.addCase(RegisterFn.rejected, (state, action) => {
      state.loading = false,
      state.data = {} as iRegisterResponse,
      state.error = action.payload as string
      })
  }
})


export const { clearRegisterState } = registerSlice.actions


export default registerSlice