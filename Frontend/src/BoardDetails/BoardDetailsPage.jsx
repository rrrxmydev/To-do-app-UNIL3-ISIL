import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Section from "./Section";
import ProfileDropdown from "../Board/ProfileDropdown";
import InviteMemberPopup from "../Board/InviteMemberPopup";
import { useParams } from "react-router-dom";
import axios from "axios";

const BoardDetailsPage = () => {
  const [sections, setSections] = useState([]);
  const [invitePopupOpen, setInvitePopupOpen] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [showNewSectionModal, setShowNewSectionModal] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const [board, setBoard] = useState(null);

  // Fetch sections and board details
  const getSections = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/board/get/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
      });

      const joinedBoards = res.data.joined_boards.data || [];
      const ownedBoards = res.data.owned_boards.data || [];

      const foundBoard =
        joinedBoards.find((el) => Number(el.id) == Number(id)) ||
        ownedBoards.find((el) => Number(el.id) == Number(id));

      if (foundBoard) {
        setBoard(foundBoard);
        setSections(foundBoard.sections || []);
      } else {
        setError("Board not found.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getSections();
    }
    return () => {
      isMounted = false;
    };
  }, [id]);

  
  const handleCreateNewSection = async () => {
    if (newSectionTitle.trim()) {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/section/create/",
          {
            title: newSectionTitle,
            board: id,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("authToken")}`,
            },
          }
        );

        const newSection = res.data;
        setSections((prevSections) => [...prevSections, newSection]);
        handleCloseNewSectionModal();
      } catch (error) {
        console.error("Error creating new section:", error);
        setError("Failed to create section. Please try again.");
      }
    }
  };

  const handleAddSectionClick = () => {
    setShowNewSectionModal(true);
  };

  const handleCloseNewSectionModal = () => {
    setShowNewSectionModal(false);
    setNewSectionTitle("");
  };

  
  const addTaskToSection = (sectionId, newTask) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? { ...section, tasks: [...section.tasks, newTask] }
          : section
      )
    );
  };

  
  const updateTaskInSection = (sectionId, updatedTask) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              tasks: section.tasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
              ),
            }
          : section
      )
    );
  };

  
  const deleteTaskFromSection = (sectionId, taskId) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              tasks: section.tasks.filter((task) => task.id !== taskId),
            }
          : section
      )
    );
  };

  
  const handleDeleteSection = async (sectionId) => {
    setLoading(true);
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/section/delete/${sectionId}/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        }
      );
      
      setSections(sections.filter((section) => section.id !== sectionId));
      console.log("Section deleted successfully");
    } catch (error) {
      console.error("Error deleting section:", error);
      setError("Failed to delete section. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between px-8 py-1 text-white bg-blue-900 shadow">
        <h1 className="text-3xl font-bold">TO<br />DO</h1>
        <div className="relative">
          <AccountCircleIcon
            fontSize="large"
            className="mr-3 cursor-pointer hover:text-gray-300"
            onClick={() => setProfileMenuVisible(!profileMenuVisible)}
          />
          <GroupAddIcon
            fontSize="large"
            className="cursor-pointer hover:text-gray-300"
            onClick={() => setInvitePopupOpen(true)}
          />
          {profileMenuVisible && <ProfileDropdown userEmail={"djelloul@gmail.com"} />}
        </div>
      </div>

      <div className="min-h-screen p-8 bg-slate-200">
        <h1 className="flex items-center gap-2 mb-8 text-3xl font-bold text-black">
          {board ? board.title : "Board Page"}
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex space-x-8">
            {sections.map((section) => (
              <Section
                key={section.id}
                title={section.title}
                tasks={section.tasks}
                sectionId={section.id}
                addTaskToState={addTaskToSection}
                updateTaskInState={updateTaskInSection}
                deleteTaskFromState={deleteTaskFromSection}
                handleDeleteSection={handleDeleteSection}
              />
            ))}

            <div
              className="flex items-center justify-center w-1/4 p-5 rounded-md cursor-pointer bg-slate-300 hover:bg-slate-400"
              onClick={handleAddSectionClick}
            >
              <span className="text-2xl font-bold text-gray-600">+ Add Section</span>
            </div>
          </div>
        )}
      </div>

      {invitePopupOpen && (
        <InviteMemberPopup board={board} onClose={() => setInvitePopupOpen(false)} />
      )}

      {showNewSectionModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-bold text-gray-700">Add New Section</h2>
            <input
              type="text"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              placeholder="Enter section title"
              className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCloseNewSectionModal}
                className="px-4 py-2 text-gray-600 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNewSection}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardDetailsPage;
