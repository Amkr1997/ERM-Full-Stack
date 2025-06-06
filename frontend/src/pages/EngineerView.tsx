import AssignmentCard from "@/components/others/AssignmentCard";
import { useAssignmentStore, useAuthStore } from "@/store/store";
import { useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL_PROD;

const EngineerView = () => {
  const { userId } = useAuthStore((state) => state);
  const { setAssignments, allAssignments } = useAssignmentStore(
    (state) => state
  );

  useEffect(() => {
    // fetching all assignments.
    (async () => {
      try {
        const engineersData = await fetch(
          `${API_URL}/api/assignment/get/all/assignments/${userId}`
        );

        const res = await engineersData.json();
        setAssignments(res?.allAssignments);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <section className="w-full px-6">
      <h1 className="text-3xl font-bold text-center py-6">
        All Your Assignments
      </h1>
      {allAssignments?.map((assignment) => (
        <AssignmentCard assignment={assignment} key={assignment._id} />
      ))}
    </section>
  );
};

export default EngineerView;
