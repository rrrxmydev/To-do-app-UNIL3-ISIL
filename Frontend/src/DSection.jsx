
import React, { useState } from "react";
import DSTask from "./DSTask";

export default function DSection({ title, description, deleteSection }) {
  const [tasks, setTasks] = useState([]);
  const [addingTask, setAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isExpanded, setIsExpanded] = useState(true); // Track section expansion state
  const [isDeleting, setIsDeleting] = useState(false); // Track deletion animation

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isDeleting: true } : task
    );
    setTasks(updatedTasks);

    setTimeout(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }, 300); // Match animation duration
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      // If there is text in the input box, create a new task
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: tasks.length + 1, title: newTaskTitle.trim(), isDeleting: false },
      ]);
      setNewTaskTitle("");
      setAddingTask(false); // Close input box after adding the task
    } else {
      // Open the input box if it's not already open
      setAddingTask(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && newTaskTitle.trim()) {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, title: newTaskTitle.trim(), isDeleting: false },
      ]);
      setAddingTask(false);
      setNewTaskTitle("");
    } else if (e.key === "Escape") {
      setAddingTask(false);
      setNewTaskTitle("");
    }
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleDeleteSection = () => {
    setIsDeleting(true);
    setTimeout(deleteSection, 300); // Wait for animation to complete before removing
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#EEEEEE",
        padding: isExpanded ? "15px" : "5px 15px", // Adjust padding
        borderRadius: "15px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        minHeight: isExpanded ? "120px" : "41px", // Reduce height
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        minWidth: "700px",
        maxWidth: "700px", //Width of sections
        margin: "10px 0", // Reduce vertical margin
        opacity: isDeleting ? 0 : 1,
        transform: isDeleting ? "scale(0.9)" : "scale(1)",
        flexShrink: isExpanded ? 0 : 1, // Allow shrinking
      }}
    >
      <button
        onClick={toggleExpand}
        style={{
          fontFamily: "Century gothic",
          position: "absolute",
          top: "8px",
          right: "10px",
          background: "transparent",
          color: isExpanded ? "#1A4372" : "red",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          transform: `rotate(${isExpanded ? "-180deg" : "0deg"})`,
          transition: "transform 0.3s ease",
        }}
      >
        <p
          style={{ color: "#1A4372", fontSize: "30px" }}
          className="material-icons"
        >
          arrow_drop_up
        </p>
      </button>

      <button
        onClick={handleDeleteSection}
        style={{
          fontFamily: "Cascadia mono",
          position: "absolute",
          top: isExpanded ? "18px" : "8px",
          right: "50px",
          background: "transparent",
          color: "red",
          border: "none",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        <p
          style={{ fontSize: "30px", color: "#1A4372" }}
          className="material-icons"
        >
          remove
        </p>
      </button>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginRight: "70px",
        }}
      >
        <h3
          style={{
            margin: "0",
            fontSize: "21px",
            paddingLeft: "10px",
            textAlign: "left",
            wordBreak: "break-word",
            lineHeight: "1.2",
          }}
        >
          {title}
        </h3>
      </div>

      {isExpanded && (
        <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
          {description}
        </p>
      )}

      {isExpanded && (
        <div style={{ marginTop: "10px", flexGrow: 1 }}>
          {tasks.map((task, index) => (
            <DSTask
              key={task.id}
              taskId={task.id}
              taskName={task.title}
              onDelete={deleteTask}
              isFirst={index === 0}
              isLast={index === tasks.length - 1}
              isSingleTask={tasks.length === 1}
            />
          ))}

          {addingTask && (
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter task name"
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "8px",
                border: "1px solid transparent",
                borderRadius: "5px",
                outline: "none",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
              }}
            />
          )}
        </div>
      )}

      {isExpanded && (
        <button
          style={{
            marginTop: "10px",
            fontFamily: "Calibri",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "19px",
            alignSelf: "flex-start",
            borderRadius: "10px",
            color: "#1A4372",
          }}
          onClick={handleAddTask}
        >
          Add Task
        </button>
      )}
    </div>
  );
}
