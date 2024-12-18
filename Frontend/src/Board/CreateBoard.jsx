import React, { useState } from 'react';
import axios from 'axios';

const CreateBoard = ({ isOpen, onClose, onBoardAdded }) => {
  const [boardTitle, setBoardTitle] = useState('');

  const handleCreateBoard = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "http://127.0.0.1:8000/api/board/create/",
        { title: boardTitle },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      
      onBoardAdded();
      
      onClose();
    } catch (error) {
      console.error("Failed to create board:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-lg w-[400px]">
        <h2 className="mb-4 text-xl font-bold">Create a New Board</h2>
        <input
          type="text"
          placeholder="Board Title"
          className="w-full p-2 mb-4 border rounded"
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button
            onClick={handleCreateBoard}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBoard;
