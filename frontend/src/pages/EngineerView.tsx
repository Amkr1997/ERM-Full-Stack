import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/store";
import { useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL_PROD;

const EngineerView = () => {
  const { logout, userId } = useAuthStore((state) => state);

  useEffect(() => {
    // fetching all assignments.
    (async () => {
      try {
        const engineersData = await fetch(
          `${API_URL}/api/assignment/get/all/assignments/${userId}`
        );

        const res = await engineersData.json();
        console.log(res?.allAssignments);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <section className="w-screen">
      <Button className="w-fit mx-auto" onClick={logout}>
        Logout
      </Button>
    </section>
  );
};

export default EngineerView;
