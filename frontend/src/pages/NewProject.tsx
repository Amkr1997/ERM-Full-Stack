import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/store";
const API_URL = import.meta.env.VITE_API_URL_PROD;
// const API_URL = import.meta.env.VITE_API_URL_LOCAL;

type NewProjectFormInputs = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  requiredSkills: string[];
  teamSize: number;
  status: string;
  managerId: string;
};

const NewProject: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewProjectFormInputs>();
  const { userRole, userId } = useAuthStore((state) => state);

  const onSubmit = async (data: NewProjectFormInputs) => {
    console.log("Form Data:", data);

    console.log(data);

    if (userRole !== "manager") return;

    try {
      const response = await fetch(`${API_URL}/api/project/add/new/project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, managerId: userId }),
      });

      const uploadedProject = await response.json();

      console.log(uploadedProject);

      toast.success("Project Created!");
    } catch (error) {
      console.log(error);
      if (error) {
        toast.error("Project creation failed!");
      }
    }

    reset();
  };

  return (
    <main className="w-full">
      <h2 className="text-center pt-2 text-2xl font-medium uppercase">
        Add New Project
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="pb-5 pt-2 w-screen px-7 sm:px-0 sm:max-w-2/3 mx-auto"
      >
        <div className="py-4 flex flex-col items-center">
          <label className="block text-xl py-1 self-start">Project Name:</label>
          <input
            type="text"
            {...register("name")}
            className={`w-full p-2 border border-gray-300 rounded-md`}
          />
          {errors.name && (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          )}
        </div>

        <div className="py-4 flex flex-col items-center">
          <label className="block text-xl py-1 self-start">
            Project Description:
          </label>
          <input
            type="text"
            {...register("description")}
            className={`w-full p-2 border border-gray-300 rounded-md`}
          />
          {errors.description && (
            <span style={{ color: "red" }}>{errors.description.message}</span>
          )}
        </div>

        <div className="py-4 flex flex-col items-center">
          <label className="block text-xl py-1 self-start">
            Project Start Date:
          </label>
          <input
            type="date"
            {...register("startDate")}
            className={`w-full p-2 border border-gray-300 rounded-md ${
              errors.startDate ? "border-red-500" : ""
            }`}
          />
          {errors.startDate && (
            <span style={{ color: "red" }}>{errors.startDate.message}</span>
          )}
        </div>

        <div className="py-4 flex flex-col items-center">
          <label className="block text-xl py-1 self-start">
            Project End Date:
          </label>
          <input
            type="date"
            {...register("endDate")}
            className={`w-full p-2 border border-gray-300 rounded-md ${
              errors.endDate ? "border-red-500" : ""
            }`}
          />
          {errors.endDate && (
            <span style={{ color: "red" }}>{errors.endDate.message}</span>
          )}
        </div>

        <div className="py-4 flex items-center gap-3 flex-wrap">
          <label className="block text-xl py-1">Project Required Skills:</label>
          <label className="text-xl">
            <input
              type="checkbox"
              value="HTML"
              {...register("requiredSkills")}
            />
            HTML
          </label>

          <label className="text-xl">
            <input
              type="checkbox"
              value="CSS"
              {...register("requiredSkills")}
            />
            CSS
          </label>

          <label className="text-xl">
            <input
              type="checkbox"
              value="JavaScript"
              {...register("requiredSkills")}
            />
            Javascript
          </label>

          <label className="text-xl">
            <input
              type="checkbox"
              value="React"
              {...register("requiredSkills")}
            />
            React
          </label>

          <label className="text-xl">
            <input
              type="checkbox"
              value="Node"
              {...register("requiredSkills")}
            />
            Node
          </label>

          <label className="text-xl">
            <input
              type="checkbox"
              value="Express"
              {...register("requiredSkills")}
            />
            Express
          </label>

          <label className="text-xl">
            <input
              type="checkbox"
              value="MongoDB"
              {...register("requiredSkills")}
            />
            MongoDB
          </label>

          <label className="text-xl">
            <input
              type="checkbox"
              value="Figma"
              {...register("requiredSkills")}
            />
            Figma
          </label>

          <label className="text-xl">
            <input
              type="checkbox"
              value="Jest"
              {...register("requiredSkills")}
            />
            Jest
          </label>

          {errors.status && (
            <span style={{ color: "red" }}>{errors.status.message}</span>
          )}
        </div>

        <div className="py-4 flex flex-col items-center">
          <label className="block text-xl py-1 self-start">
            Project Team Size:
          </label>
          <input
            type="number"
            {...register("teamSize")}
            className={`w-full p-2 border border-gray-300 rounded-md ${
              errors.teamSize ? "border-red-500" : ""
            }`}
          />
          {errors.teamSize && (
            <span style={{ color: "red" }}>{errors.teamSize.message}</span>
          )}
        </div>

        <div className="py-4 flex items-center gap-3 flex-wrap">
          <label className="block text-xl py-1">Project Status:</label>
          <label className="text-xl">
            <input type="radio" value="planning" {...register("status")} />
            Planning
          </label>

          <label className="text-xl">
            <input type="radio" value="active" {...register("status")} />
            Active
          </label>

          <label className="text-xl">
            <input type="radio" value="completed" {...register("status")} />
            Completed
          </label>
          {errors.status && (
            <span style={{ color: "red" }}>{errors.status.message}</span>
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

export default NewProject;
