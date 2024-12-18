import React, { useState } from "react";
import axios from "axios";
import OtpVerification from "./OtpVerification";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register/", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      });
      localStorage.setItem("authToken",res.data.token);
      setOtpSent(true); 
      setError("");
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "An error occurred.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="w-full max-w-md px-4 py-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-5xl font-bold text-center text-blue-900">Register</h2>

      
      {otpSent ? (
        <OtpVerification email={email} />
      ) : (
        <>
          
          <div className="mb-4">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="first_name"
              type="text"
              placeholder="Enter your first name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="last_name"
              type="text"
              placeholder="Enter your last name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="**********"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirm_password"
              type="password"
              placeholder="**********"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full py-2 font-bold text-white transition bg-blue-600 rounded-full hover:bg-blue-700"
            onClick={handleRegister}
          >
            REGISTER
          </button>
        </>
      )}

      {error && <div className="mt-4 font-medium text-center text-red-600">{error}</div>}
    </div>
  );
};

export default Register;
