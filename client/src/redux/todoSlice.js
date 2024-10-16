import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_HOST } from "../config";

// fetchTodo => async action to fetch all the available todos
const fetchTodos = createAsyncThunk("fetchTodos", async () => {
  const data = await axios.get(
    BACKEND_HOST + "/api/v1/getTodos?email=" + "goodhariom@gmail.com"
    // REMINDER: hard coding it for now , i have to replace it with user email once user slice is also completed
  );
  if (!data) {
    console.error("No data found in the request");
  }
  console.log(data.data);
  return data.data.todos;
});

// async function for adding todos
const addTodo = createAsyncThunk("addTodo", async (action) => {
  const { title, description } = action;
  const response = await axios.post(BACKEND_HOST + "/api/v1/putTodos", {
    // REMINDER: hard coding it for now , i have to replace it with user email once user slice is also completed
    email: "goodhariom@gmail.com",
    title,
    description,
  });
  console.log(response);
  return response.json();
});

const initialState = {
  todos: [],
  isFetching: false,
  error: false,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,

  extraReducers: (builder) => {
    // cases for fetchTodos cases
    builder
      // case if the todo are are pending
      .addCase(fetchTodos.pending, (state) => {
        state.isFetching = true;
        console.log("pending");
        state.error = false;
      })
      // if fulfilled
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isFetching = false;
        state.error = false;
        console.log(action.payload);
        state.todos = action.payload;
      })
      // if not fulfilled
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isFetching = false;
        state.error = true;
        console.log("rejected");
        state = action.payload;
      });

    // cases for add Todo async requests
    builder
      .addCase(addTodo.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        // action represents data returned by async thunk when it is accepted
        state.isFetching = false;
        state.error = false;
        state.todos.push(action.payload);
      })
      // in case if addTodo is rejected
      .addCase(addTodo.rejected, (state, payload) => {
        state.isFetching = false;
        state.error = true;
      });
  },
});

export { fetchTodos, addTodo };

export default todoSlice.reducer;
