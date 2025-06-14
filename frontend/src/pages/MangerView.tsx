import DisplayProjects from "@/components/others/DisplayProjects";
import EngineersPage from "@/components/others/EngineersPage";
import InfoCards from "@/components/others/InfoCards";
import {
  useAssignmentStore,
  useAuthStore,
  useEngineerStore,
  useProjectStore,
  useUserProfileStore,
} from "@/store/store";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL_PROD;

const ManagerView = () => {
  const { userId } = useAuthStore((state) => state);
  const { setEngineers, allEngineers } = useEngineerStore((state) => state);
  const { profile, setProfile } = useUserProfileStore((state) => state);
  const { allProjects, setProjects } = useProjectStore((state) => state);
  const { allAssignments, setAssignments } = useAssignmentStore(
    (state) => state
  );

  // fetch all engineers.
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/user/get/all/engineers`);
        const data = await res.json();

        setEngineers(data?.engineers);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  // fetch user data.
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/user/get/user/${userId}`);
        const data = await res.json();

        setProfile(data?.user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  // fetching all projects.
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/project/get/all/projects/${userId}`
        );
        const data = await res.json();

        setProjects(data?.allProjects);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  // fetching all assignments.
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/assignment/get/all/assignments/${userId}`
        );
        const data = await res.json();

        setAssignments(data?.allAssignments);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  return (
    <section className="w-screen">
      <div className="w-full pt-5 pb-3 flex items-center justify-center flex-wrap gap-4">
        <Link className="block w-fit" to={"/new/project"}>
          <button className="bg-[#fa5252] hover:bg-[#c92a2a] text-white font-bold py-1 w-full px-4 rounded-2xl cursor-pointer">
            Create new Project
          </button>
        </Link>

        <Link className="block w-fit" to={"/new/assignment"}>
          <button className="bg-[#fa5252] hover:bg-[#c92a2a] text-white font-bold py-1 w-full px-4 rounded-2xl cursor-pointer">
            Create new Assignment
          </button>
        </Link>
      </div>
      {profile && (
        <main className="sm:px-9 pt-7">
          <h1 className="text-3xl pb-3 text-gray-800 font-medium">
            Manager Dashboard{" "}
            <span className="text-lg text-gray-500 font-medium">
              {" "}
              (Overview of your engineering team and projects)
            </span>
          </h1>

          <section className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoCards title="All engineers" value={allEngineers?.length} />
            <InfoCards title="Total projects" value={allProjects?.length} />
            <InfoCards
              title="Total assignments"
              value={allAssignments?.length}
            />
          </section>

          <section className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <EngineersPage />
            <DisplayProjects />
          </section>
        </main>
      )}
    </section>
  );
};

export default ManagerView;
