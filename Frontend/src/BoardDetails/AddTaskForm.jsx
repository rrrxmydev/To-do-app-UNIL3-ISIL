import React, { useState } from 'react';

const AddTaskForm = ({ section, setSections }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = () => {
    const newTask = { title: taskTitle, description: taskDescription };
    const updatedSections = section.tasks
      ? section.tasks.push(newTask)
      : section.tasks = [newTask];

    setSections((prevSections) =>
      prevSections.map((sec) =>
        sec.title === section.title ? { ...sec, tasks: section.tasks } : sec
      )
    );
    setTaskTitle('');
    setTaskDescription('');
  };

  return (
    <div className="p-4 mb-4 bg-white rounded-lg shadow-sm add-task-form">
      <h4 className="text-lg font-bold">Add New Task</h4>
      <input
        type="text"
        placeholder="Task Title"
        className="w-full p-2 mt-2 border border-gray-300 rounded-md"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        className="w-full p-2 mt-2 border border-gray-300 rounded-md"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <button
        className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-md"
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTaskForm;
