import React, { useState } from "react";
import axios from "axios";
import Task from "./Task";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const Section = ({
  title,
  tasks = [],
  sectionId,
  addTaskToState,
  updateTaskInState,
  deleteTaskFromState,
  deleteSectionFromState, 
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [taskDetails, setTaskDetails] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const handleTaskClick = (task) => {
    setTaskDetails(task);
    setShowPopup(true);
  };


  const handleClosePopup = () => {
    setShowPopup(false);
    setTaskDetails({ title: "", description: "" });
    setError(null);
  };


  const handleAddTask = async () => {
    setLoading(true);
    setError(null);

    const newTaskData = {
      title: taskDetails.title,
      description: taskDetails.description,
      section: sectionId,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/tasks/create/",
        newTaskData,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        }
      );

      console.log("Task created successfully:", response.data);

      
      addTaskToState(sectionId, response.data);

      
      handleClosePopup();
    } catch (error) {
      setError("Failed to create task. Please try again.");
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleEditTask = async () => {
    setLoading(true);
    setError(null);

    const updatedData = {};
    if (taskDetails.title !== taskDetails.originalTitle) updatedData.title = taskDetails.title;
    if (taskDetails.description !== taskDetails.originalDescription) updatedData.description = taskDetails.description;

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/tasks/update/${taskDetails.id}/`,
        updatedData,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        }
      );

      console.log("Task update successful:", response.data);

    
      updateTaskInState(sectionId, response.data);

    
      handleClosePopup();
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteTask = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/tasks/delete/${taskDetails.id}/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        }
      );

      console.log("Task deletion successful");

    
      deleteTaskFromState(sectionId, taskDetails.id);

    
      handleClosePopup();
    } finally {
      setLoading(false);
    }
  };

  
  const handleDeleteSection = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/section/delete/${sectionId}/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        }
      );

      console.log("Section deletion successful");

      
      deleteSectionFromState(sectionId); 

    } catch (error) {
      setError("Failed to delete section. Please try again.");
      console.error("Error deleting section:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-1/4 p-5 rounded-md bg-slate-300">
      <h2 className="flex items-center justify-between mb-4 text-lg font-bold text-black">
        {title}
        <IconButton
          color="error"
          onClick={handleDeleteSection} 
          disabled={loading}
        >
          <DeleteIcon />
        </IconButton>
      </h2>
      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div key={index} onClick={() => handleTaskClick(task)}>
              <Task
                title={task.title}
                subtitle={task.description}
                date={task.created_at}
                category={task.status}
                accentColor="blue"
              />
            </div>
          ))
        ) : (
          <p>No tasks available</p>
        )}

        <button
          className="text-sm text-blue-500 hover:text-blue-400"
          onClick={() => setShowPopup(true)}
        >
          + Add Task
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="p-6 bg-white rounded-md shadow-lg w-80">
            <h2 className="mb-4 text-lg font-bold text-black">
              {taskDetails.id ? "Edit Task" : "Add New Task"}
            </h2>

            <input
              type="text"
              name="title"
              value={taskDetails.title}
              onChange={(e) => setTaskDetails({ ...taskDetails, title: e.target.value })}
              className="w-full px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="description"
              value={taskDetails.description}
              onChange={(e) => setTaskDetails({ ...taskDetails, description: e.target.value })}
              className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex justify-end space-x-2">
              <button
                className="px-3 py-1 text-gray-500 hover:text-gray-700"
                onClick={handleClosePopup}
              >
                Cancel
              </button>
              <button
                className={`px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={taskDetails.id ? handleEditTask : handleAddTask}
                disabled={loading}
              >
                {loading ? (taskDetails.id ? "Updating..." : "Creating...") : taskDetails.id ? "Update Task" : "Create Task"}
              </button>
              {taskDetails.id && (
                <button
                  className={`px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleDeleteTask}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete Task"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Section;
