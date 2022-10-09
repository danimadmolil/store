import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/auth.slice";
export default configureStore({ reducer: { auth: authReducer } });
