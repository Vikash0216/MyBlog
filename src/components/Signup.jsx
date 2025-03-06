import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Logo, Input } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");
    try {
      const newUser = await authService.createUser(data);
      if (newUser) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        {/* Logo Section */}
        <div className="flex justify-center mb-4">
          <span className="text-2xl font-bold">
            <Logo />
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Sign in to create an account
        </h2>

        {/* Error Message */}
        {error && <p className="mt-2 text-center text-red-500">{error}</p>}

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(create)}>
          {/* Name Input */}
          <Input
            label="Name: "
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required",
              validate: {
                matchPattern: (value) =>
                  /^[A-Za-z\s]{2,50}$/.test(value) || "Please enter a valid name",
              },
            })}
          />

          {/* Email Input */}
          <Input
            label="Email: "
            type="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              validate: {
                matchPattern: (value) =>
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                  "Please enter a valid email",
              },
            })}
          />

          {/* Password Input */}
          <Input
            label="Password: "
            type="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a password"
            {...register("password", {
              required: "Password is required",
              validate: {
                matchPattern: (value) =>
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ||
                  "Please enter a valid password",
              },
            })}
          />

          {/* Signup Button */}
          <Button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </Button>
        </form>

        {/* Already have an account? */}
        <h2 className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </h2>
      </div>
    </div>
  );
}

export default Signup;
