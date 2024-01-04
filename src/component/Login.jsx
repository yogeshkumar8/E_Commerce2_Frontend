import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar2";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      // Use Axios for making the POST request

      const response = await axios.post("https://backend-a0q6.onrender.com/login", {
        email,
        password,
      });
      if (response.status === 200 && response.data.success) {
        const token = response.data.token;
        onLogin(token);
        navigate("/home");
      } else {
        setError(response.data.message || "Invalid login credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="bg-slate-200 w-full h-screen">
      <Navbar />
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form method="POST" onSubmit={handleSubmit}>
          <label className="block mb-2">
            Email:
            <input
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label className="block mb-2">
            Password:
            <input
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            type="submit"
          >
            Login
          </button>

          <p className="mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link to="/" className="text-blue-500">
              Signup here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
