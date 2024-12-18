import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import BoardCard from "./BoardCard";
import CreateBoard from "./CreateBoard";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import axios from "axios";
import ProfileDropdown from "./ProfileDropdown";
import InviteMemberPopup from "./InviteMemberPopup";
import Invites from "./Invites";

const Boards = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [joinedBoardsList, setJoinedBoardsList] = useState([]);
  const [ownedBoardsList, setOwnedBoardsList] = useState([]);
  const [invitePopupOpen, setInvitePopupOpen] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [boardsList ,setBoardsList] = useState([]);
  const [userEmail, setUserEmail] = useState("user@example.com");


  
  const handleProfileClick = () => {
    setProfileMenuVisible(!profileMenuVisible);
  };

  
  const handleInviteClick = () => {
    setInvitePopupOpen(true);
  };

  const handleCloseInvitePopup = () => {
    setInvitePopupOpen(false);
  };

  
  const handleDropdownClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

 
  const getBoardsList = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/board/get/", {
        headers: { Authorization: `Token ${localStorage.getItem("authToken")}`},
      });
      setJoinedBoardsList(res.data.joined_boards.data);
      setOwnedBoardsList(res.data.owned_boards.data);
      setBoardsList(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  useEffect(() => {
    getBoardsList();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
      <div className="flex items-center justify-between px-8 py-1 text-white bg-blue-900 shadow">
        <h1 className="text-3xl font-bold">TO<br/>DO</h1>
        <div className="relative">
          <AccountCircleIcon
            fontSize="large"
            className="mr-3 cursor-pointer hover:text-gray-300"
            onClick={handleProfileClick}
          />
          <GroupAddIcon
            fontSize="large"
            className="cursor-pointer hover:text-gray-300"
            onClick={handleInviteClick} 
          />
          
          {profileMenuVisible && <ProfileDropdown userEmail={userEmail} />}
        </div>
      </div>

      
      <div className="flex flex-col flex-wrap flex-1 gap-6 p-6">
        <section className="flex-1 w-full">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Owned Boards</h2>
          <div className="flex flex-wrap gap-6">
            {ownedBoardsList.length > 0
              ? ownedBoardsList.map((board) => (
                  <BoardCard
                    id={board.id}
                    key={board.id}
                    title={board.title}
                    nbDoneTasks={5}
                    nbTasks={0}
                    nbSections={board.sections.length}
                    getBoardsList={getBoardsList}
                  />
                ))
              : <p className="text-gray-600">You have no owned boards yet.</p>}
          </div>
        </section>

        
        <section className="flex-1 w-full mt-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Joined Boards</h2>
          <div className="flex flex-wrap gap-6">
            {joinedBoardsList.length > 0
              ? joinedBoardsList.map((board) => (
                  <BoardCard
                    id={board.id}
                    key={board.id}
                    title={board.title}
                    nbDoneTasks={2}
                    nbTasks={8}
                    nbSections={2}
                    boardsList = {boardsList}
                  />
                ))
              : <p className="text-gray-600">You have no joined boards yet.</p>}
          </div>
        </section>
      </div>

      
      <div className="fixed flex flex-col gap-4 bottom-6 right-6">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="flex items-center justify-center w-12 h-12 text-white transition bg-blue-600 rounded-full shadow-md hover:bg-blue-700"
        >
          <AddIcon fontSize="large" />
        </button>
        <button
          onClick={handleDropdownClick} 
          className="flex items-center justify-center w-12 h-12 text-white transition bg-blue-500 rounded-full shadow-md hover:bg-blue-600"
        >
          <GroupIcon fontSize="large" />
        </button>
      </div>

      
      <Invites
        isOpen={dropdownVisible}
        onClose={() => setDropdownVisible(false)} 
      />

      
      {invitePopupOpen && (
        <InviteMemberPopup
          boards={ownedBoardsList} 
          onClose={handleCloseInvitePopup}
          getBoardsList={getBoardsList}
        />
      )}

     
      <CreateBoard isOpen={isPopupOpen} onBoardAdded={getBoardsList} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
};

export default Boards;
