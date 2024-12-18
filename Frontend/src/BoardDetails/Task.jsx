import React, { useState } from "react";

const Task = ({ title, subtitle, date, category, accentColor }) => {
  const [isDone, setIsDone] = useState(false);

  const toggleTaskDone = () => {
    setIsDone(!isDone);
  };

  return (
    <div
      className={`p-4 bg-blue-700 border rounded-lg shadow-md flex items-center`}
    >
    
      <div
        className={`w-6 h-6 flex items-center justify-center rounded-full border-2 cursor-pointer mr-3 ${
          isDone
            ? "bg-green-500 border-green-500"
            : "bg-transparent border-gray-300 hover:border-gray-500"
        }`}
        onClick={toggleTaskDone}
      >
        {isDone && (
          <div className="w-3 h-3 bg-white rounded-full"></div>
        )}
      </div>

      
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3
            className={`font-semibold text-white ${
              isDone ? "line-through text-gray-400" : ""
            }`}
          >
            {title}
          </h3>
        </div>
        {subtitle && (
          <p
            className={`mb-2 text-sm text-white ${
              isDone ? "line-through text-gray-400" : ""
            }`}
          >
            {subtitle}
          </p>
        )}
        {date && (
          <p
            className={`flex items-center gap-1 text-xs text-white ${
              isDone ? "line-through text-gray-400" : ""
            }`}
          >
            {date}
          </p>
        )}
      </div>
    </div>
  );
};

export default Task;
