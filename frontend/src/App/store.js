import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/Auth/slice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
