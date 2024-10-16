import React from "react";

const SingleTodo = ({ title, description }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
      <div className="md:flex">
        <div className="p-4">
          <h2 className="uppercase tracking-wide text-lg font-semibold text-indigo-600">
            {title}
          </h2>
          <p className="mt-2 text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleTodo;
