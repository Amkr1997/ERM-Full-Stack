import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/store";
// const API_URL = import.meta.env.VITE_API_URL_PROD;
const API_URL = import.meta.env.VITE_API_URL_LOCAL;

type UpdateFormInputs = {
  department: string;
  skills: string[];
  seniority: string;
  maxCapacity: number;
};

const UpdateProfile: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateFormInputs>();
  const { userId } = useAuthStore((state) => state);

  const onSubmit = async (data: UpdateFormInputs) => {
    console.log("Form Data:", data);

    try {
      const response = await fetch(
        `${API_URL}/api/user/update/user/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const updatedData = await response.json();
      console.log(updatedData);
      toast.success("Profile updated!");
    } catch (error) {
      console.log(error);
      if (error) {
        toast.error("profile didn't update!");
      }
    }

    reset();
  };

  return (
    <main className="w-full">
      <h2 className="text-center pt-2 text-2xl font-medium uppercase">
        Update Complete Profile
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="pb-5 pt-2 w-screen px-7 sm:px-0 sm:max-w-2/3 mx-auto"
      >
        <div className="py-4 flex flex-col items-center">
          <label className="block text-xl py-1 self-start">
            Department Name:
          </label>
          <input
            type="text"
            {...register("department")}
            className={`w-full p-2 border border-gray-300 rounded-md`}
          />
          {errors.department && (
            <span style={{ color: "red" }}>{errors.department.message}</span>
          )}
        </div>

        <div className="py-4 flex flex-col items-center">
          <label className="block text-xl py-1 self-start">
            Select Seniority:
          </label>
          <select
            {...register("skills", { required: "Skills is required" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Seniority</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
          </select>
          {typeof errors.seniority?.message === "string" && (
            <p style={{ color: "red" }}>{errors.seniority.message}</p>
          )}
        </div>

        <div className="py-4 flex items-center gap-3 flex-wrap">
          <label className="block text-xl py-1">Add Skills:</label>

          <label className="text-xl">
            <input type="checkbox" value="React" {...register("skills")} />
            React
          </label>

          <label className="text-xl">
            <input type="checkbox" value="HTML" {...register("skills")} />
            HTML
          </label>

          <label className="text-xl">
            <input type="checkbox" value="CSS" {...register("skills")} />
            CSS
          </label>

          <label className="text-xl">
            <input type="checkbox" value="Javacript" {...register("skills")} />
            Javascript
          </label>

          <label className="text-xl">
            <input type="checkbox" value="Node" {...register("skills")} />
            Node
          </label>

          <label className="text-xl">
            <input type="checkbox" value="MongoDB" {...register("skills")} />
            MongoDB
          </label>

          <label className="text-xl">
            <input type="checkbox" value="Jest" {...register("skills")} />
            Jest
          </label>

          <label className="text-xl">
            <input type="checkbox" value="Figma" {...register("skills")} />
            Figma
          </label>

          {errors.skills && (
            <span style={{ color: "red" }}>{errors.skills.message}</span>
          )}
        </div>

        <div className="py-3">
          <button
            type="submit"
            className="w-full bg-[#fa5252] text-white py-2 rounded-2xl cursor-pointer hover:bg-[#f03e3e] transition-all duration-200"
          >
            ADD
          </button>
        </div>
      </form>
    </main>
  );
};

export default UpdateProfile;
