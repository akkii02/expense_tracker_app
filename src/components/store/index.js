import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import expenseSlice from "./expense-slice";
import themeSlice from "./themeSlice"; // Change the import to match the file name

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    expense: expenseSlice.reducer,
    theme: themeSlice.reducer, // Use themeSlice directly
  },
});

export default store;
