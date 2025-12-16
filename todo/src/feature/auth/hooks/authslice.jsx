 import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      // ذخیره کردن userId یا کل ابجکت در کوکی
      Cookies.set("login", JSON.stringify(action.payload), { expires: 7 }); // 7 روز معتبر
    },
    logout: (state) => {
      state.user = null;
      Cookies.remove("login"); // پاک کردن کوکی
    },
    addTodo: (state, action) => {
      if (state.user) {
        state.user.todos.push(action.payload);
        Cookies.set("login", JSON.stringify(state.user)); // بروزرسانی کوکی
      }
    },
    updateTodo: (state, action) => {
      if (state.user) {
        const idx = state.user.todos.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.user.todos[idx] = action.payload;
        Cookies.set("login", JSON.stringify(state.user));
      }
    },
    deleteTodo: (state, action) => {
      if (state.user) {
        state.user.todos = state.user.todos.filter((t) => t.id !== action.payload);
        Cookies.set("login", JSON.stringify(state.user));
      }
    },
  },
});

export const { login, logout, addTodo, updateTodo, deleteTodo } = authSlice.actions;
export default authSlice.reducer;
