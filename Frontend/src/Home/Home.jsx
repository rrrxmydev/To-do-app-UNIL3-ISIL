import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

const Home = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();  

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  const handleLoginSuccess = () => {
    navigate("/boards");  
  };

  const handleRegisterSuccess = () => {
    navigate("/boards");
  };

  return (
    <div className="flex flex-col h-screen md:flex-row">
      <div className="flex flex-col items-center justify-center w-full p-8 text-white bg-blue-900 md:w-1/2">
        <h1 className="mb-4 text-5xl font-extrabold">TO</h1>
        <h2 className="mb-8 text-5xl font-extrabold">DO</h2>
        <p className="mb-8 text-lg text-center">
          Welcome to TODO's official website, the largest tasks management platform on the web, join us now!
        </p>
        <button
          className="px-8 py-4 mt-8 text-xl font-bold text-blue-900 bg-white rounded-full hover:bg-gray-200"
          onClick={toggleForm}
        >
          {isRegistering ? "BACK TO LOGIN" : "REGISTER"}
        </button>
      </div>

      <div className="flex flex-col items-center justify-center w-full p-8 bg-white md:w-1/2">
        {isRegistering ? (
          <Register onSuccess={handleRegisterSuccess} /> 
        ) : (
          <>
            <h2 className="mb-8 text-3xl font-bold text-blue-900 md:text-5xl">Log in</h2>
            <Login setError={setError} setResponse={setResponse} onLoginSuccess={handleLoginSuccess} /> {/* Pass success handler to Login component */}
            {error && (
              <div className="mt-4 font-medium text-center text-red-600">
                <p>{error}</p>
              </div>
            )}
            {response && (
              <div className="mt-6 text-center text-green-600">
                <p>Login Successful: {JSON.stringify(response)}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
