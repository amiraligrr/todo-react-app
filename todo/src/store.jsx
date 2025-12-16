import { configureStore } from "@reduxjs/toolkit";
import authslice from "./feature/auth/hooks/authslice";

export const store = configureStore({
  reducer: {
    auth: authslice,
  },
});
