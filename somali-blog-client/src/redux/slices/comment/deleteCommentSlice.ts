import { DEFAULT_LOCAL_HOST, DEFAULT_MESSAGE_ERROR } from "@/components/constants";
import { iDeleteCommentResponse } from "@/types/comments/deletecomment";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const initialState = {
  loading: false,
  data: {} as iDeleteCommentResponse,
  error: "",
};

export const deleteCommentFn = createAsyncThunk(
  "comment/delete",
  async (commentId: number, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${DEFAULT_LOCAL_HOST}/api/comment/delete/${commentId}`);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message || DEFAULT_MESSAGE_ERROR);
      }
      return rejectWithValue(DEFAULT_MESSAGE_ERROR);
    }
  }
);

export const deleteCommentSlice = createSlice({
  name: "delete comment slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCommentFn.pending, (state) => {
        state.loading = true;
        state.data = {} as iDeleteCommentResponse;
        state.error = "";
      })
      .addCase(deleteCommentFn.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(deleteCommentFn.rejected, (state, action) => {
        state.loading = false;
        state.data = {} as iDeleteCommentResponse;
        state.error = action.payload as string;
      });
  },
});

export default deleteCommentSlice.reducer;
