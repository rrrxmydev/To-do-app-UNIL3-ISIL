import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ListIcon from "@mui/icons-material/List";
import DeleteIcon from "@mui/icons-material/Delete"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BoardCard = ({ id,title, nbDoneTasks, nbTasks, nbSections,getBoardsList}) => {
  const onDelete = async()=>{
    const token = localStorage.getItem("authToken");
    await axios.delete(`http://127.0.0.1:8000/api/board/delete/${id}/`,{
      headers: { Authorization: `Token ${token}` },
    });
    getBoardsList();
  }
  const navigate = useNavigate();
  const handleViewBoard = ()=>{
    navigate(`/boards/${id}/details`);
  }
  
  return (
    <div className="relative flex flex-col h-56 p-6 transition-all duration-300 bg-white rounded-lg shadow-md cursor-pointer w-72 hover:scale-105 hover:shadow-lg">
      {/* Top Section */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate">{title}</h3>
        <CheckCircleIcon className="text-green-500" />
      </div>

      {/* Progress Summary */}
      <p className="mb-4 text-sm text-gray-500">
        Completed Tasks: <span className="font-semibold text-gray-800">{nbDoneTasks}</span> / {nbTasks}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 mt-auto border-t">
        <div className="flex items-center gap-2 text-gray-600">
          <ListIcon className="text-blue-400" />
          <span className="text-sm">{nbSections} Sections</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="text-sm font-medium text-blue-500 hover:text-blue-700"
            onClick={handleViewBoard}
          >
            View Board
          </button>
          {/* Delete Button */}
          <button 
            className="flex items-center justify-center w-8 h-8 transition-all duration-200 bg-red-100 rounded-full hover:bg-red-200"
            onClick={onDelete}
          >
            <DeleteIcon className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
