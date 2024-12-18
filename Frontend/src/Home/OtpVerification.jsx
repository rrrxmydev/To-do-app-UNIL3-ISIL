import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const OtpVerification = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState(false);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate(); // Initialize navigate

  // Send OTP to the user's email
  const handleSendOtp = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/generate-otp/",
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setOtpError("");
    } catch (error) {
      setOtpError("Failed to send OTP. Please try again.");
    }
  };

  
  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/verify-otp/",
        { otp_code: otp },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      setOtpSuccess(true);
      setOtpError("");

      
      if (res.data.is_email_verified) {
        navigate("/boards");
      } else {
        setOtpError("Email not verified yet. Please try again.");
      }
    } catch (error) {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md px-6 py-8 mx-auto bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-center">Verify Your Email</h3>
      <p className="text-center">
        We have sent an OTP to your email: <strong>{email}</strong>
      </p>

      
      <button
        className="w-full py-2 mt-4 font-bold text-white transition bg-blue-600 rounded-full hover:bg-blue-700"
        onClick={handleSendOtp}
      >
        Resend OTP
      </button>

      
      <div className="mb-4">
        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
          Enter OTP
        </label>
        <input
          id="otp"
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>

    
      <button
        className="w-full py-2 font-bold text-white transition bg-blue-600 rounded-full hover:bg-blue-700"
        onClick={handleVerifyOtp}
      >
        Verify OTP
      </button>

      {otpSuccess && (
        <div className="mt-4 text-center text-green-600">
          <p>OTP verified successfully. You can now log in.</p>
        </div>
      )}

      {otpError && (
        <div className="mt-4 text-center text-red-600">
          <p>{otpError}</p>
        </div>
      )}
    </div>
  );
};

export default OtpVerification;
