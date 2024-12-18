import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom"; 

const ProfileDropdown = ({ userEmail }) => {
  const navigate = useNavigate(); 

  const onLogout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/logout/",
        {},
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("authToken")}`, 
          },
        }
      );
      localStorage.removeItem("authToken"); 
      navigate("/"); 
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <div className="absolute right-0 z-50 w-48 mt-2 bg-white border rounded-lg shadow-md">
      <div className="p-4">
        <p className="font-semibold text-gray-800">Email: {userEmail}</p>
      </div>
      <div className="border-t">
        <ul>
          <li>
            <button className="block w-full px-4 py-2 text-left text-blue-500 hover:bg-gray-100">
              Reset Password
            </button>
          </li>
          <li>
            <button className="block w-full px-4 py-2 text-left text-blue-500 hover:bg-gray-100">
              Reset Email
            </button>
          </li>
          <li>
            <button
              onClick={onLogout}
              className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileDropdown;
