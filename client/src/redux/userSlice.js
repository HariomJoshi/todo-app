import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "User",
  email: "email@gmail.com",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  reducers:{
    setUser: (state, action) =>{
      
    }
  },
  extraReducers: (builder) => {},
});

export default userSlice;
