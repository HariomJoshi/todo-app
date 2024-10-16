import React from "react";
import AddTodo from "./components/AddTodo";
import MyTodos from "./components/MyTodos";

const Home = () => {
  return (
    <>
      <AddTodo />
      <MyTodos />
    </>
  );
};

export default Home;
