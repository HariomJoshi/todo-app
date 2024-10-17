import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todoSlice";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const onAddTodo = ({ title, description }) => {
    // dispatch a reducer
    dispatch(addTodo({ title, description }));
  };

  const handleSubmit = () => {
    if (title && description) {
      // here we have to dispatch async thunk
      onAddTodo({ title, description }); // Call the parent callback with the todo item
      setTitle(""); // Clear the input fields
      setDescription("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(); // Submit on pressing "Enter"
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add a new Todo</h2>
      <div className="mb-4">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="mb-4">
        <textarea
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={3}
        ></textarea>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Enter
      </button>
    </div>
  );
};

export default AddTodo;
