import { createAction, createReducer } from "@reduxjs/toolkit";
import { getItemWithExpire } from "../utils/localStorage";
const initialState = getItemWithExpire("auth") || {};
//actions
export const setUser = createAction("auth/setUser");
//reducer
const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setUser, (state, action) => {
    return (state = action.payload);
  });
});
export default reducer;
