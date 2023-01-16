import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Instance from "../../services/instance";

export const setProfile = createAsyncThunk("profile/loading", async () => {
  return await Instance.getServerData("/user/123");
});

const initialState: any = {
  value: [1, 2],
};

const counterSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setProfile.fulfilled, (state, { payload }) => {});
  },
});

export default counterSlice.reducer;
