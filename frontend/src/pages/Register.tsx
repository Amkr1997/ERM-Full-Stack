// src/components/Login.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL_PROD;
// const API_URL = import.meta.env.VITE_API_URL_LOCAL;

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormInputs) => {
    // console.log("Form Data:", data);

    try {
      const response = await fetch(`${API_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      await response.json();
      toast.success("Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      if (error) {
        toast.error("Registration failed!");
      }
    }

    reset();
  };

  return (
    <main className="w-screen">
      <h2 className="text-center pt-8 text-6xl font-medium">
        Sign<span className="text-[#fa5252]">Up</span>
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        // style={{ maxWidth: "w-full", margin: "auto" }}
        className="py-5 w-screen px-7 sm:px-0 sm:max-w-2/3 mx-auto"
      >
        <div className="py-3 flex flex-col items-center">
          <label className="block text-xl py-1 self-start">Name:</label>
          <input
            type="name"
            {...register("name", { required: "Name is required" })}
            className={`w-full p-2 border border-gray-300 rounded-md ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div className="py-3 flex flex-col items-center">
          <label className="block text-xl py-1 self-start">Email:</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className={`w-full p-2 border border-gray-300 rounded-md ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <div className="py-3 flex flex-col items-center">
          <label className="block text-xl py-1 self-start">Password:</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min length is 6" },
            })}
            className={`w-full p-2 border border-gray-300 rounded-md ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        <div className="py-3 flex flex-col items-center">
          <label className="block text-xl py-1 self-start">Role:</label>
          <select
            {...register("role", { required: "Role is required" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select role</option>
            <option value="manager">Manager</option>
            <option value="engineer">Engineer</option>
          </select>
          {errors.role && <p style={{ color: "red" }}>{errors.role.message}</p>}
        </div>

        <div className="py-3">
          <button
            type="submit"
            className="w-full bg-[#fa5252] text-white py-2 rounded-2xl cursor-pointer hover:bg-[#f03e3e] transition-all duration-200"
          >
            SignUp
          </button>
        </div>
        <div className="w-full">
          <Link
            to={"/login"}
            className="hover:border-b-2 border-black w-fit mx-auto block pt-3 pb-0"
          >
            Already have account login
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Login;
