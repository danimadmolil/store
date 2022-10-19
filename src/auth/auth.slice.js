import { createSlice } from "@reduxjs/toolkit";
import { getItemWithExpire } from "../utils/localStorage";
const initialState = getItemWithExpire("user") || {};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
