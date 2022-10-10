import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/auth.slice";
import { themeReducer } from "./slices/themeSlice";
export default configureStore({
  reducer: { auth: authReducer, theme: themeReducer },
});
