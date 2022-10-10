import { createSlice } from "@reduxjs/toolkit";
import { getItem } from "../../utils/localStorage";

const themeSlice = createSlice({
  name: "theme",
  initialState: { type: getItem("theme") || "light" },
  reducers: {
    setThemeMode: (state, action) => {
      return { ...state, type: action.payload.type };
    },
  },
});
export const { setThemeMode } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
