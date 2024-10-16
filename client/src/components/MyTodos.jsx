import React from "react";
import SingleTodo from "./SingleTodo";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "../redux/todoSlice";

const MyTodos = () => {
  // select todos from redux
  const todos = useSelector((state) => {
    console.log(state);
    return state.todo.todos;
  });
  // console.log(todos);
  const dispatch = useDispatch();
  const refreshTodos = () => {
    dispatch(fetchTodos());
  };
  // const [todos, setTodos] = useState([
  //   {
  //     title: "My first todo",
  //     description: "This is the description",
  //   },
  // ]);
  return (
    <div className="space-y-4">
      <button onClick={refreshTodos}>Refresh</button>
      {todos.map((todo, index) => (
        <SingleTodo
          key={index}
          title={todo.title}
          description={todo.description}
        />
      ))}
    </div>
  );
};

export default MyTodos;
