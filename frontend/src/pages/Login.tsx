// src/components/Login.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import login from "../context/AuthContext";

type LoginFormInputs = {
  email: string;
  password: string;
  role: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [err, setErr] = useState("");

  const onSubmit = async (data: LoginFormInputs) => {
    console.log("Form Data:", data);

    try {
      const { email, password, role } = data;
      const res = await login(email, password, role);
      console.log(res);
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <>
      <h1 className="text-center pt-6 text-4xl uppercase">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: "300px", margin: "auto" }}
        className="py-5"
      >
        <div className="py-4 flex flex-col items-center">
          <label className="block text-2xl py-2">Email:</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <div className="py-4 flex flex-col items-center">
          <label className="block text-2xl py-2">Password:</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min length is 6" },
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        <div className="py-4 flex flex-col items-center">
          <label className="block text-2xl py-2">Role:</label>
          <select
            {...register("role", { required: "Role is required" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select role</option>
            <option value="Manager">Manager</option>
            <option value="Engineer">Engineer</option>
          </select>
          {errors.role && <p style={{ color: "red" }}>{errors.role.message}</p>}
        </div>

        <div className="py-3">
          <button
            type="submit"
            className="w-full bg-red-900 text-white py-2 rounded-2xl cursor-pointer hover:bg-amber-50 hover:text-red-950 transition-all duration-200"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
