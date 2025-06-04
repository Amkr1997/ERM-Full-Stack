import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/store";
const API_URL = import.meta.env.VITE_API_URL_PROD;

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
    reset,
  } = useForm<LoginFormInputs>();
  const { setAuth } = useAuthStore((state) => state);

  const onSubmit = async (data: LoginFormInputs) => {
    console.log("Form Data:", data);

    try {
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const loginData = await response.json();

      if (loginData.success === true) {
        toast.success("Login successful!");
      }

      console.log(loginData);

      // localStorage.setItem("resourcely_token", loginData?.jwtToken);
      // localStorage.setItem("resourcely_role", loginData?.role);

      setAuth(loginData?.role); // setting role in store

      setTimeout(() => {
        if (loginData?.role === "manager") {
          window.location.href = "/manager/view";
        } else {
          window.location.href = "/engineer/view";
        }
      }, 1000);
    } catch (error) {
      console.log(error);
      if (error) {
        toast.error("Login failed!");
      }
    }

    reset();
  };

  return (
    <main className="w-screen">
      <h2 className="text-center pt-8 text-6xl font-medium">
        Log<span className="text-[#fa5252]">In</span>
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        // style={{ maxWidth: "300px", margin: "auto" }}
        className="py-5 w-screen px-7 sm:px-0 sm:max-w-2/3 mx-auto"
      >
        <div className="py-4 flex flex-col items-center">
          <label className="block text-xl py-1 self-start">Email:</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className={`w-full p-2 border border-gray-300 rounded-md ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}
        </div>

        <div className="py-4 flex flex-col items-center">
          <label className="block text-xl py-1 self-start">Password:</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 3, message: "Min length is 3" },
            })}
            className={`w-full p-2 border border-gray-300 rounded-md ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password.message}</span>
          )}
        </div>

        <div className="py-4 flex flex-col items-center">
          <label className="block text-xl py-1 self-start">Role:</label>
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
            className="w-full bg-[#fa5252] text-white py-2 rounded-2xl cursor-pointer hover:bg-[#f03e3e] transition-all duration-200"
          >
            Login
          </button>
        </div>
        <div className="w-full">
          <Link
            to={"/register"}
            className="hover:border-b-2 border-black w-fit mx-auto block pt-3 pb-0"
          >
            New Here, Sign Up
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Login;
