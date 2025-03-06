import { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { Logo, Input, Button } from "./index";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    setError(""); 

    try {
        const session = await authService.login(data.email, data.password);
        
        if (session) {
      
            await new Promise((resolve) => setTimeout(resolve, 100));

            const userData = await authService.getCurrentUser();
            if (userData) {
                dispatch(authLogin(userData)); 
                navigate("/");
            } else {
                setError("Failed to fetch user details. Please try again.");
            }
        } else {
            setError("Login failed. No session returned.");
        }
    } catch (error) {
        console.error("Login error:", error); 
        setError(error.message || "An unexpected error occurred.");
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
          Login into your account
        </h2>

        {/* Signup Link */}
        <p className="mt-2 text-center text-gray-600">
          Don&apos;t have an account?&nbsp;
          <Link className="text-blue-600 hover:underline" to="/signup">
            Signup
          </Link>
        </p>

        {/* Error Message */}
        {error && <p className="mt-2 text-center text-red-500">{error}</p>}

        {/* Form */}
        <form className="mt-6" onSubmit={handleSubmit(login)}>
          <div className="space-y-4">
            {/* Email Input */}
            <Input
              label="Email: "
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            {/* Password Input */}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", { required: "Password is required" })}
            />

            {/* Login Button */}
            <Button type="submit" className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
