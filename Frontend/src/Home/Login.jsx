import React, { useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";

const Login = ({ setError, setResponse, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginFunc = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        email: email,
        password: password,
      });
      localStorage.setItem("authToken", res.data.token);
      setResponse(res.data);
      setError("");
      onLoginSuccess(); 
    } catch (error) {
      if (error.response.data.email && error.response.status === 400) {
        setError("Invalid Email. Please try again.");
      } else if (error.response.data.password && error.response.status === 400) {
        setError("Invalid password. Please try again.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  const handleLogIn = () => {
    loginFunc();
  };

  return (
    <div className="w-full max-w-md px-4 py-6 mx-auto bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="flex items-center p-2 border border-gray-300 rounded-lg">
          <span className="pr-3 text-blue-600">
            <MailOutlineIcon />
          </span>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full font-medium focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="flex items-center p-2 border border-gray-300 rounded-lg">
          <span className="pr-3 text-blue-600">
            <LockOutlinedIcon />
          </span>
          <input
            id="password"
            type="password"
            placeholder="**********"
            className="w-full font-medium focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <button
        className="w-full py-2 font-bold text-white transition bg-blue-600 rounded-full hover:bg-blue-700"
        onClick={handleLogIn}
      >
        LOG IN
      </button>

      {setError && (
        <div className="mt-4 font-medium text-center text-red-600">
          <p>{setError}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
