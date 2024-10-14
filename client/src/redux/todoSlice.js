import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "Random todo",
  description: "Description todo",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  extraReducers: (builder) => {},
});

export default todoSlice.reducer;
