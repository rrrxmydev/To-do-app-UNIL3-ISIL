import React, { useState, useEffect } from "react";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const Invites = ({ onClose, isOpen,getBoardsList }) => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    if (isOpen) {
      fetchInvitations();
    }
  }, [isOpen]);

  const fetchInvitations = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/board/invitations/", {
        headers: {
          Authorization: `Token ${token}`,
        },
        withCredentials: true,
      });
      setInvitations(response.data.invitations);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching invitations:", error);
      setLoading(false);
    }
  };

  const handleAccept = async (invitationId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/board/invitation/accept/${invitationId}/`, null, {
        headers: { Authorization: `Token ${token}` },
      });
      setInvitations((prevInvitations) =>
        prevInvitations.filter((invitation) => invitation.id !== invitationId)
      );
      getBoardsList();
    } catch (error) {
      console.error("Error accepting invitation:", error);
    }
  };

  const handleDecline = async (invitationId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/board/invitation/decline/${invitationId}/`, null, {
        headers: { Authorization: `Token ${token}` },
      });
      setInvitations((prevInvitations) =>
        prevInvitations.filter((invitation) => invitation.id !== invitationId)
      );
    } catch (error) {
      console.error("Error declining invitation:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute z-10 p-4 bg-white rounded-lg shadow-lg right-10 w-96">
      <h3 className="mb-2 text-lg font-semibold">Invitations</h3>
      {loading ? (
        <p>Loading...</p>
      ) : invitations.length === 0 ? (
        <p>No invitations at the moment.</p>
      ) : (
        invitations
          .filter((invitation) => invitation.status === "pending") 
          .map((invitation) => (
            <div key={invitation.id} className="flex flex-col items-center justify-between p-4 mb-4 bg-gray-100 rounded-md">
              <span className="font-normal text-md">
                Invitation from <strong>{invitation.inviter_email}</strong> to join<strong> {invitation.board_title}</strong>
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleAccept(invitation.id)}
                  className="flex items-center px-3 py-1 text-green-500 bg-green-100 rounded-md hover:bg-green-200"
                >
                  <CheckIcon />
                  <span className="ml-2">Accept</span>
                </button>
                <button
                  onClick={() => handleDecline(invitation.id)}
                  className="flex items-center px-3 py-1 text-red-500 bg-red-100 rounded-md hover:bg-red-200"
                >
                  <CloseIcon />
                  <span className="ml-2">Decline</span>
                </button>
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default Invites;
