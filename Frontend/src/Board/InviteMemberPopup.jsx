import React, { useState } from 'react';
import axios from 'axios';
const InviteMemberPopup = ({ boards, onClose }) => {
  const [email, setEmail] = useState('');
  const [selectedBoard, setSelectedBoard] = useState(boards.length > 0 ? boards[0].id : '');

  const handleInvite = async() => {
    const token = localStorage.getItem("authToken");
    await axios.post(`http://127.0.0.1:8000/api/board/${selectedBoard}/invite/`,{
        invitee_email:email,
      },{
        headers: { Authorization: `Token ${token}` },
      });
      alert("invite sent");
    
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-lg w-[400px]">
        <h2 className="mb-4 text-xl font-bold">Invite Member to a Board</h2>
        <input
          type="email"
          placeholder="Invitee's Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          value={selectedBoard}
          onChange={(e) => setSelectedBoard(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          {boards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.title}
            </option>
          ))}
        </select>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleInvite}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Invite
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteMemberPopup;
