import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuthStore, useEngineerStore, useProjectStore } from "@/store/store";
// const API_URL = import.meta.env.VITE_API_URL_PROD;
const API_URL = import.meta.env.VITE_API_URL_LOCAL;

type NewAssignmentFormInputs = {
  name: string;
  allocationPercentage: number;
  startDate: string;
  endDate: string;
  role: string;
  managerId: string;
  engineerId: string;
  projectId: string;
};

const NewAssignment: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewAssignmentFormInputs>();
  const { userId } = useAuthStore((state) => state);
  const { allEngineers } = useEngineerStore((state) => state);
  const { allProjects } = useProjectStore((state) => state);

  const onSubmit = async (data: NewAssignmentFormInputs) => {
    console.log("Form Data:", data);

    try {
      const response = await fetch(
        `${API_URL}/api/assignment/add/new/${data?.engineerId}/assignment/${data?.projectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, managerId: userId }),
        }
      );

      const projectdata = await response.json();

      console.log(projectdata);

      toast.success("Login successful!");
    } catch (error) {
      console.log(error);
      if (error) {
        toast.error("Login failed!");
      }
    }

    reset();
  };

  return (
    <main className="w-full">
      <h2 className="text-center pt-2 text-2xl font-medium uppercase">
        Add New Assignment
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="pb-5 pt-2 w-screen px-7 sm:px-0 sm:max-w-2/3 mx-auto"
      >
        <div className="py-4 flex flex-col items-center">
          <label className="block text-xl py-1 self-start">
            Assignment Name:
          </label>
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
            Allocation Percentage:
          </label>
          <input
            type="number"
            {...register("allocationPercentage")}
            className={`w-full p-2 border border-gray-300 rounded-md`}
          />
          {errors.allocationPercentage && (
            <span style={{ color: "red" }}>
              {errors.allocationPercentage.message}
            </span>
          )}
        </div>

        <div className="py-4 flex flex-col items-center">
          <label className="block text-xl py-1 self-start">
            Select Project:
          </label>
          <select
            {...register("projectId", { required: "Engineer is required" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Project</option>
            {allProjects?.map((project) => {
              return (
                <option key={project?._id} value={project?._id}>
                  {project?.name} | Start Date:{" "}
                  {new Date(project.startDate).toISOString().split("T")[0]} |
                  End Date:{" "}
                  {new Date(project.endDate).toISOString().split("T")[0]}
                </option>
              );
            })}
          </select>
          {typeof errors.projectId?.message === "string" && (
            <p style={{ color: "red" }}>{errors.projectId.message}</p>
          )}
        </div>

        <div className="py-4 flex flex-col items-center">
          <label className="block text-xl py-1 self-start">
            Assignment Start Date:
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
            Assignment End Date:
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
          <label className="block text-xl py-1">Assignment Role:</label>

          <label className="text-xl">
            <input type="radio" value="Developer" {...register("role")} />
            Developer
          </label>

          <label className="text-xl">
            <input type="radio" value="Tech Lead" {...register("role")} />
            Tech Lead
          </label>

          <label className="text-xl">
            <input type="radio" value="Designer" {...register("role")} />
            Designer
          </label>

          <label className="text-xl">
            <input type="radio" value="Tester" {...register("role")} />
            Tester
          </label>

          {errors.role && (
            <span style={{ color: "red" }}>{errors.role.message}</span>
          )}
        </div>

        <div className="py-4 flex flex-col items-center">
          <label className="block text-xl py-1 self-start">
            Select Engineer:
          </label>
          <select
            {...register("engineerId", { required: "Engineer is required" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Engineer</option>
            {allEngineers?.map((engineer) => {
              return (
                <option key={engineer?._id} value={engineer?._id}>
                  {engineer?.name} | {"Skills: "}
                  {engineer?.skills.join(", ")}
                </option>
              );
            })}
          </select>
          {typeof errors.engineerId?.message === "string" && (
            <p style={{ color: "red" }}>{errors.engineerId.message}</p>
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

export default NewAssignment;
