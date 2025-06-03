// src/components/Login.tsx
import React from "react";
import { useForm } from "react-hook-form";

type LoginFormInputs = {
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
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Form Data:", data);
  };

  return (
    <>
      <h1 className="text-center pt-6 text-4xl uppercase">Register</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: "300px", margin: "auto" }}
        className="py-5"
      >
        <div className="py-3 flex flex-col items-center">
          <label className="block text-2xl py-2">Name:</label>
          <input
            type="name"
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div className="py-3 flex flex-col items-center">
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

        <div className="py-3 flex flex-col items-center">
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

        <div className="py-3 flex flex-col items-center">
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
            Register
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
